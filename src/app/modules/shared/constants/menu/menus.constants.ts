import {MenuContent} from '../../models/menu/menu-content';

const menuContentClient: MenuContent[] = [
    {
        id: 1,
        routerLink: '/perfil',
        menuItem: '/perfil',
        name: 'Perfil',
        img: {
            src: 'assets/icon-system/user-regular-grey.svg',
            alt: 'Profile'
        }
    },
    {
        id: 2,
        routerLink: '/meus-agendamentos',
        menuItem: '/meus-agendamentos',
        name: 'Meus agendamentos',
        img: {
            src: 'assets/icon-system/calendar-day-grey.svg',
            alt: 'Schedules'
        }
    },
    {
        id: 3,
        routerLink: '/historico',
        menuItem: '/historico',
        name: 'Histórico',
        img: {
            src: 'assets/icon-system/history-grey.svg',
            alt: 'History'
        }
    },
    {
        id: 4,
        routerLink: '/empresa-favoritas',
        menuItem: '/empresa-favoritas',
        name: 'Empresas favoritas',
        img: {
            src: 'assets/icon-system/company-regular-grey.svg',
            alt: 'Favorite Companies'
        }
    },
    {
        id: 5,
        routerLink: '/ajuda',
        menuItem: '/ajuda',
        name: 'Ajuda',
        img: {
            src: 'assets/icon-system/help-grey.svg',
            alt: 'Help'
        }
    },
    {
        id: 6,
        routerLink: '/sobre',
        menuItem: '/sobre',
        name: 'Sobre',
        img: {
            src: 'assets/icon-system/info-grey.svg',
            alt: 'Information'
        }
    }
];
const menuContentEmpresa: MenuContent[] = [
    {
        id: 1,
        routerLink: '/perfil',
        menuItem: '/perfil',
        name: 'Perfil',
        img: {
            src: 'assets/icon-system/user-regular-grey.svg',
            alt: 'Profile'
        }
    },
    {
        id: 2,
        routerLink: '/meus-agendamentos',
        menuItem: '/meus-agendamentos',
        name: 'Meus agendamentos',
        img: {
            src: 'assets/icon-system/calendar-day-grey.svg',
            alt: 'Schedules'
        }
    },
    {
        id: 3,
        routerLink: '/historico',
        menuItem: '/historico',
        name: 'Histórico',
        img: {
            src: 'assets/icon-system/history-grey.svg',
            alt: 'History'
        }
    },
    {
        id: 4,
        routerLink: '/funcionarios',
        menuItem: '/funcionarios',
        name: 'Funcionários',
        img: {
            src: 'assets/icon-system/company-regular-grey.svg',
            alt: 'Favorite Companies'
        }
    },
    {
        id: 5,
        routerLink: '/ajuda',
        menuItem: '/ajuda',
        name: 'Ajuda',
        img: {
            src: 'assets/icon-system/help-grey.svg',
            alt: 'Help'
        }
    },
    {
        id: 6,
        routerLink: '/sobre',
        menuItem: '/sobre',
        name: 'Sobre',
        img: {
            src: 'assets/icon-system/info-grey.svg',
            alt: 'Information'
        }
    }
];

export {menuContentEmpresa};
export {menuContentClient};


