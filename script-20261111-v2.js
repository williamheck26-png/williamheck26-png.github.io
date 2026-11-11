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
  motionToggle.innerHTML=playing?'Stop CAD motion <svg class="ui-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="5" y="5" width="14" height="14" fill="currentColor" stroke="none"/></svg>':'Play CAD motion <svg class="ui-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const image=document.getElementById('motion-image');
  image.src=playing?'hand-motion.gif':'hand.png';
  image.alt=playing?'Illustrative CAD wrist and finger curl, using nine assembled poses':'Articulated hand CAD preview';
});}
