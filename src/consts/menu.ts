import homeIcon from 'assets/icons/home.svg'
import booksIcon from 'assets/icons/books.svg'
import videosIcon from 'assets/icons/videos.svg'
import bookShelfIcon from 'assets/icons/book-shelf.svg'
import adminIcon from 'assets/icons/admin.svg'
import bookManagement from 'assets/icons/books-management.svg'
import usersIcon from 'assets/icons/users.svg'


export const menuItems = [
    {
        name: 'Início',
        href: '/',
        icon: homeIcon,
        visible: true
    }, 
    {
        name: 'Livros',
        href: '/books',
        icon: booksIcon,
        visible: true
    },
    {
        name: 'Vídeos',
        href: '/videos',
        icon: videosIcon,
        visible: false
    },
    {
        name: 'Meus Empréstimos',
        href: '/rents',
        icon: bookShelfIcon,
        visible: true
    },
    {
        name: 'Administrativo',
        href: '#',
        icon: adminIcon,
        visible: true,
        items: [
            {
                name: 'Cadastrar Livro',
                href: '/books/register',
                icon: bookManagement,
                visible: true
            },
            {
                name: 'Gerenciar Usuários',
                href: '/users',
                icon: usersIcon,
                visible: true
            },
        ]
    },
]