(function (){

  // Bloqueando arrasta imagens do site para baixar

  function desativarDragDrop () {
    document.addEventListener('dragstart', (evento) => evento.preventDefault(), false)
    document.addEventListener('drop', (evento) => evento.preventDefault(), false)
  }
  // Função para usar lazyloading no site, isso carrega a imagem somente quando o usuário chegar nela no scroll. Ao invés de usar <img src=""> fica <img data-src=""> para ativar o lazyloading
  
  function ativarLazyLoading () {
    window.addEventListener('scroll', () => {
      const alturaPagina = window.scrollY + window.innerHeight + 500
      const imagens = document.querySelectorAll('img[data-src]')

      for (const imagem of Array.from([...imagens])) {
        const bodyRect = document.body.getBoundingClientRect()
        const imagemRect = imagem.getBoundingClientRect()
        const posicaoImagem = imagemRect.top - bodyRect.top
        if (alturaPagina <= posicaoImagem) return

        const src = imagem.getAttribute('data-src')
        imagem.src = src
        imagem.removeAttribute('data-src')
      }    })
  }
  // Faça o scroll descer até uma seção clicando em um botão. Ao invés de usar <a href="#id"> usa <button data-scroll="#iddasecao"> para scrollar ao clicar no botão.

  function habilitarCliqueRolarAteSeletor () {
    window.addEventListener('click', (evento) => { 
      const seletor = evento.target.getAttribute('data-scroll')
      if (!seletor) return
  
      rolarAteSeletor(seletor)
    })
  }  
  function rolarAteSeletor (seletor) {
    const elemento = document.querySelector(seletor)
  
    window.scrollTo({
      top: elemento.offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  }
  // Ir para um link ao clicar em um botão ao invés de usar <a> usa <button data-url=""> para ir em sites fora do seu ou <button data-pagina=""> para ir até uma página do site.

  function paraPaginaExterna (url) {
    if (!url) return

    const a = document.createElement('a')
    a.rel = 'noopener noreferrer nofollow'
    a.target = '_blank'
    a.href = url
    a.click()
  }
  function paraPaginaInterna (url) {
    if (!url) return

    const a = document.createElement('a')
    a.rel = 'noopener noreferrer nofollow'
    a.target = '_self'
    a.href = url
    a.click()
  }
  function cliqueBotaoExterno () {
    window.addEventListener('click', (evento) => {
      if (evento.target.nodeName !== 'BUTTON') return

      const url = evento.target.getAttribute('data-url')
      if (!url) return

      paraPaginaExterna(url)
    })
  }
  function cliqueBotaoInterno () {
    window.addEventListener('click', (evento) => {
      if (evento.target.nodeName !== 'BUTTON') return

      const url = evento.target.getAttribute('data-pagina')
      if (!url) return

      paraPaginaInterna(url)
    })
  }
  // Ativando todas as funções

  cliqueBotaoExterno()
  cliqueBotaoInterno()
  habilitarCliqueRolarAteSeletor()
  desativarDragDrop()
  ativarLazyLoading()

}())