import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Đọc dữ liệu từ db.json
const getUsersFromFile = () => {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

// Ghi dữ liệu mới vào db.json
const writeUsersToFile = (data: any) => {
    const filePath = path.join(process.cwd(), 'db.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// API handler
export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    const dbData = getUsersFromFile();
    const users = dbData.users;

    const userExists = users.find((u: any) => u.email === email);

    if (userExists) {
        return NextResponse.json({ message: "Email already exists!" }, { status: 409 });
    }

    const newId = Date.now().toString();
    const newUser = { newId, name, email, password };
    users.push(newUser);
    dbData.users = users;
    writeUsersToFile(dbData);

    return NextResponse.json({ message: "User updated successfully!", user: newUser });
}