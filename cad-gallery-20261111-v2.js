const imageLinks=document.querySelectorAll('[data-image-viewer],.cad-evidence a');
if(imageLinks.length){
  const viewer=document.createElement('dialog');
  viewer.className='image-viewer';
  viewer.setAttribute('aria-label','Project image viewer');
  viewer.innerHTML='<div class="viewer-toolbar"><p id="viewer-title">Project image</p><div class="viewer-controls"><button type="button" id="viewer-close" autofocus>Close ×</button></div></div><div class="viewer-stage"><img id="viewer-image" alt=""></div><figcaption>Press Escape to close.</figcaption>';
  document.body.append(viewer);
  const image=viewer.querySelector('#viewer-image');
  imageLinks.forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    image.src=link.href;image.alt=link.querySelector('img')?.alt||'Project image';
    viewer.querySelector('#viewer-title').textContent=image.alt;
    viewer.showModal();
  }));
  viewer.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
}
