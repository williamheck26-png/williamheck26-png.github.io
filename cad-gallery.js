const imageLinks=document.querySelectorAll('[data-image-viewer],.cad-evidence a');
if(imageLinks.length){
  const viewer=document.createElement('dialog');
  viewer.className='image-viewer';
  viewer.setAttribute('aria-label','Project image viewer');
  viewer.innerHTML='<div class="viewer-toolbar"><p id="viewer-title">Project image</p><div class="viewer-controls"><button type="button" id="viewer-zoom" aria-pressed="false">Actual size</button><a id="viewer-original" target="_blank" rel="noopener">Open original ↗</a><button type="button" id="viewer-close" autofocus>Close ×</button></div></div><div class="viewer-stage"><img id="viewer-image" alt=""></div><figcaption>Scroll to inspect at actual size. Press Escape to close.</figcaption>';
  document.body.append(viewer);
  const image=viewer.querySelector('#viewer-image');
  const stage=viewer.querySelector('.viewer-stage');
  const zoom=viewer.querySelector('#viewer-zoom');
  const reset=()=>{stage.classList.remove('zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='Actual size';};
  imageLinks.forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();reset();
    image.src=link.href;image.alt=link.querySelector('img')?.alt||'Project image';
    viewer.querySelector('#viewer-title').textContent=image.alt;
    viewer.querySelector('#viewer-original').href=link.href;
    viewer.showModal();
  }));
  viewer.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
  zoom.addEventListener('click',()=>{const enlarged=stage.classList.toggle('zoomed');zoom.setAttribute('aria-pressed',String(enlarged));zoom.textContent=enlarged?'Fit image':'Actual size';});
  viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
  viewer.addEventListener('close',reset);
}
