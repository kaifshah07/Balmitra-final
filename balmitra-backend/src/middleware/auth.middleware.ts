import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
  role: string;
}

export interface AuthRequest extends Request {
  admin?: JwtPayload;
}

export const authenticateAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as JwtPayload;

if (
  decoded.role !== "ADMIN" &&
  decoded.role !== "SUPER_ADMIN"
) {
  return res.status(403).json({
    success: false,
    message: "Admin access required",
  });
}

req.admin = decoded;
next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.admin?.role !== "ADMIN" &&
    req.admin?.role !== "SUPER_ADMIN"
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

export const requireSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.admin?.role !== "SUPER_ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Super Admin access required",
    });
  }

  next();
};