
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-local-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const status=form.querySelector('.form-status')||document.createElement('p');
      status.className='form-status mt-3';
      if(!status.parentNode) form.appendChild(status);
      const data=Object.fromEntries(new FormData(form).entries());
      const saved=JSON.parse(localStorage.getItem('psiloCafeMessages')||'[]');
      saved.push({...data,submittedAt:new Date().toISOString()});
      localStorage.setItem('psiloCafeMessages',JSON.stringify(saved));
      status.textContent='Thanks — your message was saved in this demo. Connect Formspree or Netlify to receive it by email.';
      form.reset();
    });
  });
  const params=new URLSearchParams(location.search);
  const item=params.get('item');
  if(item){ const msg=document.querySelector('textarea[name="message"]'); if(msg) msg.value=`I would like more information about ${item.replaceAll('-',' ')}.`; }
});
