import homeIcon from 'assets/icons/home.svg'
import booksIcon from 'assets/icons/books.svg'
import videosIcon from 'assets/icons/videos.svg'
import bookShelfIcon from 'assets/icons/book-shelf.svg'

export const menuItems = [
    {
        name: 'Início',
        href: '/',
        icon: homeIcon
    }, 
    {
        name: 'Livros',
        href: '/books',
        icon: booksIcon
    },
    {
        name: 'Vídeos',
        href: '/videos',
        icon: videosIcon
    },
    {
        name: 'Meus Empréstimos',
        href: '/rents',
        icon: bookShelfIcon
    },
]