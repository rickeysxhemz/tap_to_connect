import {Trans} from '@common/i18n/trans';
import React, { useEffect, useState } from 'react';
import {ClicksReportPageLayout} from '@app/dashboard/reports/clicks/clicks-report-page-layout';
import {useActiveWorkspaceId} from '@common/workspace/active-workspace-id-context';
import {useAuth} from '@common/auth/use-auth';
import { FullPageLoader } from '@common/ui/progress/full-page-loader';
import { getFromLocalStorage } from '@common/utils/hooks/local-storage';
import { useNavigate } from '@common/utils/hooks/use-navigate';

export function AllClicksReportPage() {

  const {workspaceId} = useActiveWorkspaceId();
  const {user} = useAuth();

  const model =
    workspaceId && workspaceId > 0
      ? `workspace=${workspaceId}`
      : `user=${user?.id}`;

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    if(loading == true){

      const url_code = localStorage.getItem("url_code");
      if(url_code){
        navigate("/business-card/registering");
      }else{
        setLoading(false);
      }

    }

  }, []);

  if(loading){
    return <FullPageLoader/>
  }


  return (
    <ClicksReportPageLayout
      model={model}
      title={
        <h1 className="text-3xl font-light">
          <Trans message="Clicks report" />
        </h1>
      }
    />
  );
}
