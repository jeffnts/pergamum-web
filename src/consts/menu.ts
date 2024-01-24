import homeIcon from 'assets/icons/home.svg'
import booksIcon from 'assets/icons/books.svg'
import videosIcon from 'assets/icons/videos.svg'
import bookShelfIcon from 'assets/icons/book-shelf.svg'
import adminIcon from 'assets/icons/admin.svg'
import bookManagement from 'assets/icons/books-management.svg'
import bookPlus from 'assets/icons/book-plus.svg'
import bookWithCircular from 'assets/icons/book-with-circular.svg'
import usersIcon from 'assets/icons/users.svg'


export const menuItems = [
    {
        name: 'Início',
        description: '',
        href: '/',
        icon: homeIcon,
        visible: true,
        roles: ['ADMIN', 'USER']
    }, 
    {
        name: 'Livros',
        description: 'Listagem de todos os livros cadastrados',
        href: '/books',
        icon: booksIcon,
        visible: true,
        roles: ['ADMIN', 'USER']
    },
    {
        name: 'Vídeos',
        description: '',
        href: '/videos',
        icon: videosIcon,
        visible: false,
        roles: ['ADMIN', 'USER']
    },
    {
        name: 'Meus Empréstimos',
        description: 'Verifique todos os seus empréstimos',
        href: '/rents',
        icon: bookShelfIcon,
        visible: true,
        roles: ['ADMIN', 'USER']
    },
    {
        name: 'Administrativo',
        description: 'Funções administrativas do sistema',
        href: '/admin',
        icon: adminIcon,
        visible: true,
        roles: ['ADMIN'],
        items: [
            {
                name: 'Cadastrar Livro',
                description: '',
                href: '/admin/books/register',
                icon: bookPlus,
                visible: true
            },
            {
                name: 'Livros Cadastrados',
                description: '',
                href: '/admin/books',
                icon: bookManagement,
                visible: true
            },

            {
                name: 'Gerenciar Empréstimos',
                description: '',
                href: '/admin/rents',
                icon: bookWithCircular,
                visible: true
            },
            {
                name: 'Gerenciar Usuários',
                description: '',
                href: '/admin/users',
                icon: usersIcon,
                visible: true
            },
        ]
    },
]