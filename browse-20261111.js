(() => {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const videos=[...document.querySelectorAll('video[data-scroll-video]')];
  const visible=new Set();
  const manuallyPaused=new Set();
  const buttons=new Map();
  const automaticPauses=new WeakSet();
  const pause=(video)=>{if(!video.paused){automaticPauses.add(video);video.pause();}};
  const update=(video)=>{
    const button=buttons.get(video);
    if(!button)return;
    const playing=!video.paused&&!video.ended;
    const name=video.closest('.project').querySelector('h3').textContent;
    button.textContent=playing?'Pause Ⅱ':'Play preview';
    button.setAttribute('aria-label',`${playing?'Pause':'Play'} preview for ${name}`);
    button.setAttribute('aria-pressed',String(playing));
  };
  const start=(video)=>{
    if(document.hidden||preference.matches||manuallyPaused.has(video))return;
    video.muted=true;
    video.play().catch(()=>update(video));
  };
  videos.forEach(video=>{
    const button=video.closest('.project-preview')?.querySelector('.preview-toggle');
    if(button){
      buttons.set(video,button);
      button.addEventListener('click',()=>{
        if(video.paused){manuallyPaused.delete(video);video.muted=true;video.play().catch(()=>update(video));}
        else{manuallyPaused.add(video);video.pause();}
      });
    }
    video.addEventListener('play',()=>{manuallyPaused.delete(video);update(video);});
    video.addEventListener('pause',()=>{
      if(automaticPauses.has(video))automaticPauses.delete(video);
      else if(visible.has(video)&&!document.hidden)manuallyPaused.add(video);
      update(video);
    });
  });
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting,intersectionRatio})=>{
      if(isIntersecting&&intersectionRatio>=0.25){visible.add(target);start(target);}
      else{visible.delete(target);pause(target);}
    });
  },{threshold:[0,0.25,0.6]});
  videos.forEach(video=>observer.observe(video));
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)videos.forEach(pause);
    else visible.forEach(start);
  });
  preference.addEventListener('change',()=>{
    if(preference.matches)videos.forEach(pause);
    else visible.forEach(start);
  });
  const motion=document.querySelector('.hand-motion-study .motion');
  const toggle=motion?.querySelector('#motion-toggle');
  if(motion&&toggle){
    let inView=false;
    let pausedByVisitor=false;
    toggle.addEventListener('click',event=>{
      if(event.isTrusted)pausedByVisitor=toggle.getAttribute('aria-pressed')!=='true';
    });
    const sync=()=>{
      const shouldPlay=inView&&!document.hidden&&!preference.matches&&!pausedByVisitor;
      const playing=toggle.getAttribute('aria-pressed')==='true';
      if(shouldPlay!==playing)toggle.click();
    };
    new IntersectionObserver(entries=>{inView=entries[0].isIntersecting&&entries[0].intersectionRatio>=0.3;sync();},{threshold:0.3}).observe(motion);
    document.addEventListener('visibilitychange',sync);
    preference.addEventListener('change',sync);
  }
})();
