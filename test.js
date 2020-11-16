function testFakeUser(n=10){
    let genders = [ 'Female' , 'Male', 'Undecided' ];
    let posts = []
    let users = []
    

    console.log("%cSTARTING USER TESTS", "color: red")

    while (n--){
        let user = new User ( 
                        faker.name.findName(), 
                        faker.image.avatar(80.80), 
                        faker.random.arrayElement(genders), 
                        faker.address.countryCode(), 
                        faker.date.between("1970", "2000")
                        )

        let m = Math.floor( Math.random()*5 )
        while (m--){
            let post = new Post( 
                            faker.lorem.word(), 
                            faker.lorem.words(),
                            user
                            )
            post.render(document.querySelector('.main'))
            posts.push(post)
        } 


        user.render(document.querySelector('.messages'), getPosts(user))  

        users.push(user)
    }

    
    /////////создание компонента search с передачей ему массива имен пользователей 
    let search = new Search (users)


   // console.log(users)
        search.render( document.body.querySelector('.profile') )



    function getPosts(user){
        let user_posts = []
        posts.forEach(value => { 
            if (value.author.nickname == user.nickname)
                user_posts.push(value)            
        })
        return user_posts
    }
       

    console.log("%cENDING USER TESTS", "color: red")
}