import { ProSidebarProvider,Sidebar,Menu ,SubMenu,MenuItem}
   from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
  
  export default function SideBar() {
    const navigate = useNavigate();
    return (
      <div style={{ display: "flex", height: "100%" }}>
       
        <ProSidebarProvider>
          <Sidebar>
            <Button onClick={() => navigate("/Home")}></Button>
         
          </Sidebar>
        </ProSidebarProvider>
      </div>
    );
  }
  
