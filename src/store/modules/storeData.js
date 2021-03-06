const storeData = {
    state: {
        menuData: '',
    },
    mutations: {
      'SET_MENU': (state, menuData) => {
        state.menuData = menuData
        if(state.menuData['power_lists']){
          sessionStorage.setItem('userpower_lists',JSON.stringify(state.menuData.power_lists))
          if(state.menuData.token){
            sessionStorage.setItem('Token',state.menuData.token);
          }
          if(state.menuData.is_special){
            sessionStorage.setItem('is_special',state.menuData.is_special);
          }
          return false;
        }
        if(state.menuData['user_name']){
          sessionStorage.setItem('Token',state.menuData.token);
          let userInfo = {
            user_img:state.menuData.head_img_url,
            user_name:state.menuData.user_name,
            user_phon:state.menuData.phone,
            user_email:state.menuData.email,
            type:state.menuData.type
          }
          sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
        }else{
          sessionStorage.setItem('Token',state.menuData.token);
        }
      },
      'SET_SIGN_OUT':()=>{
        window.sessionStorage.clear()
      }
    }
  }

  export default storeData
