import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {DashboardSidenav} from '@common/ui/layout/dashboard-sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {Outlet} from 'react-router-dom';
import {DashboardNavbar} from '@common/ui/layout/dashboard-navbar';
import {useContext, useEffect, useState} from 'react';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {UpgradeButton} from '@app/dashboard/layout/sidenav/upgrade-button';
import {Button} from '@common/ui/buttons/button';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {Trans} from '@common/i18n/trans';
import {WorkspaceSelector} from '@common/workspace/workspace-selector';
import {Footer} from '@common/ui/footer/footer';
import {useSettings} from '@common/core/settings/use-settings';
import {AdHost} from '@common/admin/ads/ad-host';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import { useAuth } from '@common/auth/use-auth';

export function RegisterNfc() {
  const {
    links: {dash_footer},
  } = useSettings();

  const {user, hasPermission} = useAuth();

  const { url_code } = useParams();
  const [checking, setChecking] = useState(true);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const checkNfcLink = async () => {

    try{
      setChecking(true);
      const res = await axios.get("/api/v1/nfc-link-check/"+url_code);
      console.log(res.data);
      if(res.data.status){
        setChecking(false);
        setActive(true);
        if(url_code){
          localStorage.setItem("url_code", url_code);
        }
      }else{
        window.location.href = res.data.link;
      }

    }catch(err){
      setChecking(false);
      console.log(err);
    }

  }

  // const registerCard = async () => {

  //   try{
  //     const res = await axios.get("/api/v1/register-nfc/"+url_code);
  //     if(res.data == 1){
  //       localStorage.removeItem("url_code");
  //       navigate("/dashboard/nfc-links");
  //     }else{
  //       alert("Something wen't wrong!");
  //     }
  //   }catch(err){
  //     console.log(err);
  //   }

  // }

  useEffect(() => {

    checkNfcLink();

  }, []);

  if(checking == true){
    return <FullPageLoader/>;
  }

  if(user != null){
    return (
      <div className='p-5 m-5'>
            <h1 style={{fontWeight: 'bold', fontSize: 22}}>Unregistered Card</h1>
            <p className='my-5'>This Card is not registered yet. do you want to connect this card to your account?</p>
            <Link to={`/`} onClick={() => localStorage.removeItem('url_code')} className='focus-visible:ring text-primary bg-transparent border-transparent hover:bg-primary/4 disabled:text-disabled disabled:bg-transparent whitespace-nowrap align-middle inline-flex flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded justify-center font-semibold text-xs h-30 px-14'>
              <Trans message="Cancel"/>
            </Link>
            {/* <Button
                  size="xs"
                  variant="flat"
                  color="primary"
                  onClick={registerCard}
                >
                  <Trans message="Continue" />
            </Button> */}
            <Link to={`/business-card/registering`} className='focus-visible:ring text-on-primary bg-primary border border-primary hover:bg-primary-dark hover:border-primary-dark disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none whitespace-nowrap align-middle inline-flex flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded justify-center font-semibold text-xs h-30 px-14'>
              <Trans message="Continue"/>
            </Link>
      </div>
    );
  }else{
    return (
      <div className='p-5 m-5'>
            <h1 style={{fontWeight: 'bold', fontSize: 22}}>Unregistered Card</h1>
            <p className='my-5'>This Card is not registered yet. do you want to connect this card to your account? Therefore you need an account, would you like to register or login?</p>

            <Link to={`/`} onClick={() => localStorage.removeItem('url_code')} className='focus-visible:ring text-primary bg-transparent border-transparent hover:bg-primary/4 disabled:text-disabled disabled:bg-transparent whitespace-nowrap align-middle inline-flex flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded justify-center font-semibold text-xs h-30 px-14'>
              <Trans message="Cancel"/>
            </Link>
            <span className="mx-2"></span>
            <Link to={`/login`} className='focus-visible:ring text-primary bg-transparent border border-primary/50 hover:bg-primary/hover hover:border-primary disabled:text-disabled disabled:bg-transparent disabled:border-disabled-bg whitespace-nowrap align-middle inline-flex flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded justify-center font-semibold text-xs h-30 px-14'>
              <Trans message="Login" />
            </Link>
            <span className="mx-2"></span>
            <Link to={`/register`} className='focus-visible:ring text-on-primary bg-primary border border-primary hover:bg-primary-dark hover:border-primary-dark disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none whitespace-nowrap align-middle inline-flex flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded justify-center font-semibold text-xs h-30 px-14'>
              <Trans message="Register" />
            </Link>
          </div>
    );
  }

}

interface DashboardNavbarProps {}
function BelinkNavbar(props: DashboardNavbarProps) {
  const {billing} = useSettings();
  const {leftSidenavStatus} = useContext(DashboardLayoutContext);
  return (
    <DashboardNavbar
      {...props}
      size="sm"
      color="primary"
      menuPosition="dashboard-navbar"
      // rightChildren={
      //   leftSidenavStatus === 'compact' && (
      //     <UpgradeButton variant="flat" color="paper" />
      //   )
      // }
    >
      {leftSidenavStatus === 'compact' && billing?.enable && (
        <WorkspaceSelector
          trigger={
            <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>
              <Trans message="Workspaces" />
            </Button>
          }
        />
      )}
    </DashboardNavbar>
  );
}
