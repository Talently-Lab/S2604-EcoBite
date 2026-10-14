import jwt from "jsonwebtoken";

export function requireAuth (req,res, next){
  try{
    
    const token = req.cookies.access_token;

    if(!token){
      return res.status(401).json({message: "No authentication token privided"});
    }

    const decodedjwt = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if(!decodedjwt){
      return res.status(401).json({message: "Invalid authentication token"});
    }

    req.user = decodedjwt
    next();
  }catch(error){
    console.error(error);
    return res.status(500).json({message:"Error verifying authentication"})
  }
}


