import { promises as fs } from "fs";
import path from "path";
import os from "os";

// For serverless environments (like Vercel), use /tmp directory
// Otherwise use data directory in project root
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const dataDir = isServerless 
  ? path.join(os.tmpdir(), "campus-ride-data")
  : path.join(process.cwd(), "data");
const DB_PATH = path.join(dataDir, "db.json");

export interface User {
  id: string;
  email: string;
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: "customer" | "driver" | "admin";
  is_verified: boolean;
  created_at: string;
}

export interface Ride {
  id: string;
  rider_id: string;
  driver_id?: string;
  pickup_location: string;
  dropoff_location: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  fare?: number;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  user_id: string;
  status: "active" | "inactive";
  verification_status: "pending" | "verified" | "rejected";
  license_number?: string;
  vehicle_model?: string;
  vehicle_plate?: string;
  total_rides: number;
  completed_rides: number;
  average_rating: number;
  total_earnings: number;
}

interface Database {
  users: User[];
  rides: Ride[];
  drivers: Driver[];
}

async function readDB(): Promise<Database> {
  // Try to read the file first (might exist from build)
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (readError: any) {
    // If file doesn't exist, try to create directory
    if (readError.code === 'ENOENT') {
      // Try to create directory (might fail in read-only envs, that's okay)
      try {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
      } catch (mkdirError) {
        // Directory creation failed - this is okay, we'll return default DB
      }
      // File doesn't exist, return default database
    } else {
      // Other read error - log and return default
      console.warn("Error reading database file:", readError);
    }
    
    // Return default database (file doesn't exist or couldn't be read)
    // If file doesn't exist, return empty database
    const defaultDb: Database = {
      users: [
        {
          id: "1",
          email: "rider@campusride.com",
          phone: "+1234567890",
          // Password: "password123" - hashed with bcrypt
          password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
          first_name: "John",
          last_name: "Doe",
          user_type: "customer",
          is_verified: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          email: "driver@campusride.com",
          phone: "+1234567891",
          // Password: "password123" - hashed with bcrypt
          password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
          first_name: "Jane",
          last_name: "Smith",
          user_type: "driver",
          is_verified: true,
          created_at: new Date().toISOString(),
        },
        {
          id: "3",
          email: "admin@campusride.com",
          phone: "+1234567892",
          // Password: "password123" - hashed with bcrypt
          password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
          first_name: "Admin",
          last_name: "User",
          user_type: "admin",
          is_verified: true,
          created_at: new Date().toISOString(),
        },
      ],
      rides: [],
      drivers: [
        {
          id: "1",
          user_id: "2", // Driver user (Jane Smith)
          status: "inactive",
          verification_status: "pending",
          license_number: "",
          vehicle_model: "",
          vehicle_plate: "",
          total_rides: 0,
          completed_rides: 0,
          average_rating: 0,
          total_earnings: 0,
        },
      ],
    };
    await writeDB(defaultDb);
    return defaultDb;
  }
}

async function writeDB(data: Database): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  } catch (mkdirError) {
    // In read-only environments, warn but continue (data might be in memory/DB elsewhere)
    if (!isServerless) {
      throw new Error(`Cannot write to database: ${mkdirError}`);
    }
    console.warn("Could not create data directory in serverless environment:", mkdirError);
  }
  
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (writeError) {
    // In serverless, file writes to /tmp work, but warn if they don't
    if (isServerless) {
      console.warn("Could not write to database file in serverless environment:", writeError);
      // Data won't persist between invocations - this is expected in serverless
    } else {
      throw writeError;
    }
  }
}

export const db = {
  users: {
    findById: async (id: string): Promise<User | undefined> => {
      const data = await readDB();
      return data.users.find((u) => u.id === id);
    },
    findByEmail: async (email: string): Promise<User | undefined> => {
      const data = await readDB();
      return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    },
    findByPhone: async (phone: string): Promise<User | undefined> => {
      const data = await readDB();
      return data.users.find((u) => u.phone === phone);
    },
    findByEmailOrPhone: async (emailOrPhone: string): Promise<User | undefined> => {
      const data = await readDB();
      return data.users.find(
        (u) =>
          u.email.toLowerCase() === emailOrPhone.toLowerCase() ||
          u.phone === emailOrPhone
      );
    },
    getAll: async (): Promise<User[]> => {
      const data = await readDB();
      return data.users;
    },
    findByType: async (userType: "customer" | "driver" | "admin"): Promise<User[]> => {
      const data = await readDB();
      return data.users.filter((u) => u.user_type === userType);
    },
    create: async (user: Omit<User, "id" | "created_at">): Promise<User> => {
      const data = await readDB();
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      data.users.push(newUser);
      await writeDB(data);
      return newUser;
    },
    update: async (id: string, updates: Partial<User>): Promise<User | undefined> => {
      const data = await readDB();
      const index = data.users.findIndex((u) => u.id === id);
      if (index === -1) return undefined;
      data.users[index] = { ...data.users[index], ...updates };
      await writeDB(data);
      return data.users[index];
    },
  },
  rides: {
    findById: async (id: string): Promise<Ride | undefined> => {
      const data = await readDB();
      return data.rides.find((r) => r.id === id);
    },
    findByRider: async (riderId: string): Promise<Ride[]> => {
      const data = await readDB();
      return data.rides.filter((r) => r.rider_id === riderId);
    },
    findByDriver: async (driverId: string): Promise<Ride[]> => {
      const data = await readDB();
      return data.rides.filter((r) => r.driver_id === driverId);
    },
    findAvailable: async (): Promise<Ride[]> => {
      const data = await readDB();
      // Only return rides that are pending AND don't have a driver assigned
      return data.rides.filter((r) => 
        r.status === "pending" && !r.driver_id
      );
    },
    create: async (ride: Omit<Ride, "id" | "created_at" | "updated_at">): Promise<Ride> => {
      const data = await readDB();
      const newRide: Ride = {
        ...ride,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      data.rides.push(newRide);
      await writeDB(data);
      return newRide;
    },
    update: async (id: string, updates: Partial<Ride>): Promise<Ride | undefined> => {
      const data = await readDB();
      const index = data.rides.findIndex((r) => r.id === id);
      if (index === -1) return undefined;
      data.rides[index] = {
        ...data.rides[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      await writeDB(data);
      return data.rides[index];
    },
    getAll: async (): Promise<Ride[]> => {
      return (await readDB()).rides;
    },
  },
  drivers: {
    findByUserId: async (userId: string): Promise<Driver | undefined> => {
      const data = await readDB();
      return data.drivers.find((d) => d.user_id === userId);
    },
    create: async (driver: Omit<Driver, "id">): Promise<Driver> => {
      const data = await readDB();
      const newDriver: Driver = {
        ...driver,
        id: Date.now().toString(),
      };
      data.drivers.push(newDriver);
      await writeDB(data);
      return newDriver;
    },
    update: async (userId: string, updates: Partial<Driver>): Promise<Driver | undefined> => {
      const data = await readDB();
      const index = data.drivers.findIndex((d) => d.user_id === userId);
      if (index === -1) return undefined;
      data.drivers[index] = { ...data.drivers[index], ...updates };
      await writeDB(data);
      return data.drivers[index];
    },
    getAll: async (): Promise<Driver[]> => {
      return (await readDB()).drivers;
    },
  },
};
