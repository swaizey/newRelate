import { connectDB } from '@/app/lib/database'
import User from '@/app/models/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from 'bcryptjs'


export const authOptions ={
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{},
            async authorize(credentials){
                const {usernameEmail, password} = credentials
                
                try {
                    await connectDB()
                    const user = await User.findOne({$or:[{username:usernameEmail}, {mail:usernameEmail}]})
                    if(!user){
                        return null
                    }
                    const matchPass = await bcryptjs.compare(password, user.password)
                    if(!matchPass){
                        return null
                    }
                    return user
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user, session}){
            
            if(user){
                return{
                    ...token,
                    id: user.id,
                    lastname:user.lastname,
                    mail:user.mail,
                    address:user.address,
                    phone:user.phone,
                    username:user.username,
                    spec:user.spec,
                    img:user.img,
                    gender:user.gender,
                    like:user.like,
                    isAdmin:user.isAdmin,
                    isVerified:user.isVerified

                };
            }
            return token;
        },
        async session({session, token, user}){

                return {
                ...session,
                user:{
                    ...session.user,
                    id: token.id,
                    lastname:token.lastname,
                    mail:token.mail,
                    address:token.address,
                    phone:token.phone,
                    username:token.username,
                    spec:token.spec,
                    img:token.img,
                    gender:token.gender,
                    like:token.like,
                    isAdmin:token.isAdmin,
                    isVerified:token.isVerified,
            }
        }
        
        
    },
},
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:'/login'
    },
}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}