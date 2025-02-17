import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "../../constants/routeUrl";
import { logout } from "../../api/admin";


export const AdminSidebar = ({currentPage} : {currentPage : string}) => {
    const navigate = useNavigate()
    
    const handleLogout = async () => {
      try {
          console.log('before sending request');
          const response = await logout();
          console.log('after sending request');
          if (response.success) {
            console.log('response is true here');
            
              localStorage.removeItem("accessToken");
              navigate(`/admin${adminRoutes.SIGNIN}`);
          }
      } catch (error) {
          console.error("Logout failed:", error);
      }
    };
  
    return (
      <SidebarProvider>
        <div className="flex w-screen h-screen bg-[#000000]">
          <Sidebar>
            <SidebarHeader>
              <h1 className="px-4 text-4xl font-bold text-white font-K2D">Crevio</h1>
            </SidebarHeader>
  
            <SidebarContent className="pt-10 pl-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={currentPage=='Dashboard'} className="text-lg text-white font-Rubik" onClick={()=>navigate(`/admin${adminRoutes.DASHBOARD}`)}>Dashboard</SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Subscriptions'} className="text-lg text-white font-Rubik" onClick={()=>navigate(`/admin${adminRoutes.SUBSCRIPTIONS}`)}>Subscriptions</SidebarMenuButton>
                </SidebarMenuItem>
  
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Freelancers'} className="text-lg text-white font-Rubik" onClick={()=>navigate(`/admin${adminRoutes.FREELANCERS}`)}>Freelancers</SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Clients'} className="text-lg text-white font-Rubik" onClick={()=>navigate(`/admin${adminRoutes.CLIENTS}`)}>Clients</SidebarMenuButton>
                </SidebarMenuItem>
  
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Projects'} className="text-lg text-white font-Rubik">Projects</SidebarMenuButton>
                  {/* <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="text-sm text-white font-Comfortaa">Pending</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Completed</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub> */}
                </SidebarMenuItem>
                
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Call Records'} className="text-lg text-white font-Rubik">Call Records</SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Analytics'} className="text-lg text-white font-Rubik">Analytics</SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton isActive={currentPage=='Account'} className="text-lg text-white font-Rubik">Account</SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton />
              </SidebarMenu>
            </SidebarContent>
  
            <SidebarSeparator />
            
            <SidebarFooter>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="pb-4 pl-3 pr-48 text-xl text-white">
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="p-3 mb-2 mr-20 text-white bg-white rounded-lg shadow-md w-28" >
                  <button className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-400">
                    Profile
                  </button>
                  <button className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-400" onClick={handleLogout}>
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </SidebarFooter>
  
          </Sidebar>
  
          <SidebarRail />
  
          <SidebarInset className="p-6 text-white">
            <SidebarTrigger className="pb-3 pr-3 text-lg"/>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  };