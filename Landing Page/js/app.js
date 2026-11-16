const dark = document.getElementById('dark');
const contact_img = document.getElementById('contact-img');

contact_img.addEventListener('mouseenter', ()=>{
  dark.style.display = 'flex';
});
contact_img.addEventListener('mouseleave', ()=>{
  dark.style.display = 'none';
});

const burger = document.querySelector('.menu-container');
const nav = document.getElementById('nav-bar');

burger.addEventListener('click', ()=>{
  nav.style.display = 'grid';
  burger.classList.remove('menu-container');
});

const close_nav = document.querySelector('.close');
close_nav.addEventListener('click', ()=>{
  nav.style.display = 'none';
  burger.classList.add('menu-container');
});

function CloseNav(){
  if(nav.style.display == 'grid'){
    nav.style.display = 'none';
    burger.classList.add('menu-container');
  }
}