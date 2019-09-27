const storeData = {
    state: {
        menuData: '',
    },
    mutations: {
      'SET_MENU': (state, menuData) => {
        state.menuData = menuData
        if(state.menuData){
          console.info(state.menuData , '')
        }
        if(state.menuData['user_name']){
          localStorage.setItem('Token',state.menuData.token);
          let userInfo = {
            user_img:state.menuData.head_img_url,
            user_name:state.menuData.user_name,
            user_phon:state.menuData.phone,
            user_email:state.menuData.email,
            type:state.menuData.type
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        }else{
          localStorage.setItem('Token',state.menuData.token);
        }
      },
      'SET_SIGN_OUT':()=>{
        window.localStorage.clear()
      }
    }
  }

  export default storeData
