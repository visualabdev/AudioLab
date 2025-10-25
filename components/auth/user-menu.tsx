'use client'

import { User, LogOut, Settings, ShoppingBag, Heart, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from 'sonner'

export function UserMenu() {
  const { user, logout, setLoginOpen, setSignupOpen, isAuthenticated, isAdmin } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
  }

  if (!isAuthenticated()) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => setLoginOpen(true)}>
          Iniciar Sesión
        </Button>
        <Button onClick={() => setSignupOpen(true)}>
          Registrarse
        </Button>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {getInitials(user?.name || '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            {isAdmin() && (
              <div className="flex items-center space-x-1 mt-1">
                <Crown className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">Admin</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Mis Compras</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          <span>Favoritos</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        
        {isAdmin() && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Crown className="mr-2 h-4 w-4" />
              <span>Panel Admin</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}