import Admin from "./pages/Admin"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"
import Auth from './pages/Auth'
import { ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin />
    },
    {
        path: CART_ROUTE,
        component: <Admin />
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        component: <Shop />
    },
    {
        path: DEVICE_ROUTE + "/:id",
        component: <DevicePage />
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth />
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth />
    }
]