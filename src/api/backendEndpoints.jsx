export const backendurls = { 
        // authapp
        "signup" :'/authapp/usersignup',
        "loginurl":"/authapp/userlogin",
        "accesstokenurl":"/authapp/api/token",
        "refreshtokenurl":"/authapp/api/token/refresh",
        "otpverification":"/authapp/otpverification",
        // userprofile app
        "userprofile":"/profileapp/profiledetails",
        // show preferences
        'showpreference':"/profileapp/preferences",
        // admin app
        "subscription":"/adminapp/add_edit_subscription",
        "usermanagement":"/adminapp/usermanagement",
        "showmatches":"/adminapp/users_matches",
        
          // admin dashboard
        "dashboard":'adminapp/dashboard',
        // lookup profiles url
        'matchrequests':"/matchesmanagementapp/matchesmanagement",
        // payment urls
        'createintent':'/adminapp/create_checkout_session',
        // subscription details for each users
        "user_subscription_details":"/adminapp/subscription_details",
        // chat urls
        'personalchaturl':"/chatapp/get_useer_chat",
        // notification url
        'notification':"/chatapp/notification",
}

