class User {
    constructor(nickname, avatar, gender, location, dob){
        this.nickname = nickname
        this.avatar = avatar
        this.gender = gender
        this.location = location
        this.dob = dob
        this.online = null
    }

    render(rootElement, mode = "sm" ){
        let div = document.createElement('div')
            div.className = "user-" + mode
            div.appendChild( document.createElement('img') )
            div.children[0].src = this.avatar

            if (mode == "md"){
                let h2 = document.createElement('h2')
                    h2.innerText = this.nickname
                div.appendChild(h2)
            }

        rootElement.appendChild(div)
    }
}