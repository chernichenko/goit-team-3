;(() => {
  const menuRefs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  }

  menuRefs.openMenuBtn?.addEventListener('click', toggleMenu)
  menuRefs.closeMenuBtn?.addEventListener('click', toggleMenu)

  function toggleMenu() {
    menuRefs.menu?.classList.toggle('is-open')
  }

  const header = document.querySelector('[data-header]')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header?.classList.add('scrolled')
    } else {
      header?.classList.remove('scrolled')
    }
  })
})()
