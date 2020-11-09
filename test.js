function testFakeUser(n=10){
    let genders = [ 'female' , 'male', 'trans' ];
    let online = []
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

        user.render(document.querySelector('.messages'), Math.random() <= 0.5)
       // user.render(document.querySelector('.main'), "lg")
        users.push(user)
    }

    ///////////////!!!!  формирование массива из имен пользователей
    let users_nicknames = []
        for (i=0; i<users.length; i++)
            users_nicknames.push(users[i].nickname)

    console.log(users)

    /////////создание компонента search с передачей ему массива имен пользователей 
    let search = new Search ('nickname', users_nicknames)
        search.render( document.body.querySelector('.main') )

    console.log(users_nicknames)
    console.log("%cENDING USER TESTS", "color: red")
}