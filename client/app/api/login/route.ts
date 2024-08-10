// import { verifyLoginCredentialsUsernameAndReturnToken } from "@/actions/login/verify";
// import { loginSchema } from "@/lib/validations/login";
// import { NextRequest } from "next/server"

// export async function POST(req: NextRequest){

//     try{
//         const data = await req.json();

//         const {loginType, user_identifier, password } = loginSchema.parse(data);

//         switch (loginType){
//             case 'email':
//                 const jwt = verifyLoginCredentialsUsernameAndReturnToken(user_identifier, password);
//                 break;
//             case 'username':
//                 verifyLoginCredentialsEmail(user_identifier, password)

//         }
//     }

// }