import { FullPageLoader } from '@common/ui/progress/full-page-loader';
import { useNavigate } from '@common/utils/hooks/use-navigate';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisteringNfc() {

  const navigate = useNavigate();

  const registerCard = async () => {

    const url_code = localStorage.getItem("url_code");

    const res = await axios.get("/api/v1/register-nfc/"+url_code);
    navigate("/dashboard/nfc-links", { replace: true });

  }

  useEffect(() => {
    registerCard();
  }, []);


  return <FullPageLoader/>

}

export default RegisteringNfc
