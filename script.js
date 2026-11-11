document.querySelectorAll('[data-filter]').forEach(button=>{
  button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item=>{
      const selected=item===button;
      item.classList.toggle('active',selected);
      item.setAttribute('aria-pressed',String(selected));
    });
    let count=0;
    document.querySelectorAll('[data-category]').forEach(project=>{
      project.hidden=filter!=='all'&&project.dataset.category!==filter;
      if(!project.hidden)count++;
    });
    document.getElementById('filter-status').textContent=`Showing ${count} projects.`;
  });
});
const motionToggle=document.getElementById('motion-toggle');
if(motionToggle){motionToggle.addEventListener('click',()=>{
  const playing=motionToggle.getAttribute('aria-pressed')!=='true';
  motionToggle.setAttribute('aria-pressed',String(playing));
  motionToggle.textContent=playing?'Stop CAD motion ■':'Play CAD motion ↗';
  const image=document.getElementById('motion-image');
  image.src=playing?'hand-motion.gif':'hand.png';
  image.alt=playing?'Illustrative CAD wrist and finger curl, using nine assembled poses':'Articulated hand CAD preview';
});}
