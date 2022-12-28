import bcrypt from "bcryptjs"

export const users =[
    {
        name: "Dave Wang",
        email: "davewdh@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: true,
    },
    {
        name: "San Zhang",
        email: "zhangsan123@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: false,
    },
]
