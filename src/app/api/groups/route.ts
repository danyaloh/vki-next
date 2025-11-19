import { NextResponse } from 'next/server';
import { getGroupsDb, addGroupsDb } from '../../../../db/groupDb';

export async function GET() {
  try {
    const groups = await getGroupsDb();
    return NextResponse.json(groups, { status: 200 });
  } catch (e) {
    console.error('GET /api/groups error:', e);
    return NextResponse.json(
      { message: 'Ошибка при получении групп' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contacts } = body as { name?: string; contacts?: string };

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Название группы обязательно' },
        { status: 400 },
      );
    }

    const group = await addGroupsDb({ name: name.trim(), contacts });
    return NextResponse.json(group, { status: 201 });
  } catch (e) {
    console.error('POST /api/groups error:', e);
    return NextResponse.json(
      { message: 'Ошибка при создании группы' },
      { status: 500 },
    );
  }
}
