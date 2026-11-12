(() => {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const videos=[...document.querySelectorAll('video[data-scroll-video]')];
  const states=new Map();
  const visible=video=>{
    const r=video.getBoundingClientRect();
    const height=window.visualViewport?.height||window.innerHeight;
    const overlap=Math.min(r.bottom,height)-Math.max(r.top,0);
    return r.width>0&&r.height>0&&r.right>0&&r.left<window.innerWidth&&overlap>=Math.min(r.height*.1,60);
  };
  const update=video=>{
    const state=states.get(video);
    if(!state.button)return;
    const playing=!video.paused&&!video.ended;
    state.button.textContent=playing?'Pause Ⅱ':'Play preview';
    state.button.setAttribute('aria-pressed',String(playing));
    state.button.setAttribute('aria-label',`${playing?'Pause':'Play'} preview for ${state.name}`);
  };
  const pause=video=>{
    const state=states.get(video);
    if(!video.paused){state.automaticPause=true;video.pause();}
  };
  const start=(video,{gesture=false,manual=false}={})=>{
    const state=states.get(video);
    if(document.hidden||!visible(video)||state.manualPause||(!manual&&preference.matches))return;
    if(state.pending||(!video.paused&&!video.ended)||(state.blocked&&!gesture))return;
    video.muted=true;
    state.pending=true;
    try{
      Promise.resolve(video.play()).catch(error=>{
        state.blocked=error.name==='NotAllowedError';
        update(video);
      }).finally(()=>{state.pending=false;});
    }catch(error){state.pending=false;state.blocked=error.name==='NotAllowedError';update(video);}
  };
  videos.forEach(video=>{
    const button=video.closest('.project-preview')?.querySelector('.preview-toggle');
    const state={button,name:video.closest('.project')?.querySelector('h3')?.textContent||video.getAttribute('aria-label'),manualPause:false,automaticPause:false,pending:false,blocked:false,lastControlInput:0,index:0,playlist:video.dataset.loopPlaylist?.split('|')};
    states.set(video,state);
    video.defaultMuted=true;
    video.muted=true;
    video.playsInline=true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.autoplay=!preference.matches;
    if(preference.matches)video.removeAttribute('autoplay');
    else video.setAttribute('autoplay','');
    const controlInput=()=>{state.lastControlInput=Date.now();};
    video.addEventListener('pointerdown',controlInput);
    video.addEventListener('touchstart',controlInput,{passive:true});
    video.addEventListener('keydown',controlInput);
    button?.addEventListener('click',()=>{
      if(video.paused){state.manualPause=false;state.blocked=false;start(video,{gesture:true,manual:true});}
      else{state.manualPause=true;video.pause();}
      update(video);
    });
    video.addEventListener('play',()=>{
      state.blocked=false;
      state.manualPause=false;
      if(document.hidden||!visible(video))pause(video);
      update(video);
    });
    video.addEventListener('pause',()=>{
      if(state.automaticPause)state.automaticPause=false;
      else if(video.controls&&!video.ended&&!video.seeking&&visible(video)&&Date.now()-state.lastControlInput<800)state.manualPause=true;
      update(video);
    });
    ['loadedmetadata','loadeddata','canplay'].forEach(event=>video.addEventListener(event,()=>start(video)));
    video.addEventListener('ended',()=>{
      if(!state.playlist?.length)return;
      state.index=(state.index+1)%state.playlist.length;
      state.manualPause=false;state.blocked=false;state.pending=false;
      video.src=state.playlist[state.index];
      video.load();
      start(video);
    });
  });
  const sync=()=>videos.forEach(video=>{
    if(document.hidden||!visible(video)||preference.matches)pause(video);
    else start(video);
  });
  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;sync();});
  };
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(sync,{threshold:[0,.1,.5,1]});
    videos.forEach(video=>observer.observe(video));
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('pageshow',sync);
  window.visualViewport?.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',sync);
  const gestureRetry=event=>{
    if(event.target?.closest?.('video,.preview-toggle'))return;
    videos.forEach(video=>start(video,{gesture:true}));
  };
  document.addEventListener('touchend',gestureRetry,{passive:true});
  document.addEventListener('pointerup',gestureRetry,{passive:true});
  preference.addEventListener('change',()=>{
    videos.forEach(video=>{
      video.autoplay=!preference.matches;
      if(preference.matches)video.removeAttribute('autoplay');
      else video.setAttribute('autoplay','');
    });
    sync();
  });
  sync();
  const motion=document.querySelector('.hand-motion-study .motion');
  const toggle=motion?.querySelector('#motion-toggle');
  if(motion&&toggle){
    let inView=false,pausedByVisitor=false;
    toggle.addEventListener('click',event=>{
      if(event.isTrusted)pausedByVisitor=toggle.getAttribute('aria-pressed')!=='true';
    });
    const syncMotion=()=>{
      const shouldPlay=inView&&!document.hidden&&!preference.matches&&!pausedByVisitor;
      if(shouldPlay!==(toggle.getAttribute('aria-pressed')==='true'))toggle.click();
    };
    new IntersectionObserver(entries=>{inView=entries[0].isIntersecting&&entries[0].intersectionRatio>=.1;syncMotion();},{threshold:[0,.1]}).observe(motion);
    document.addEventListener('visibilitychange',syncMotion);
    preference.addEventListener('change',syncMotion);
  }
})();
