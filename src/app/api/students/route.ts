import { getStudentsDb, addStudentDb } from '../../../../db/studentDb';


export async function GET(): Promise<Response> {
  const students = await getStudentsDb();
  return new Response(JSON.stringify(students), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { firstName, lastName, middleName, groupId } = body ?? {};

    if (!firstName || !lastName || !middleName || !groupId) {
      return new Response(JSON.stringify({ message: 'firstName, lastName, middleName, groupId обязательны' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const created = await addStudentDb({
      firstName: String(firstName),
      lastName: String(lastName),
      middleName: String(middleName),
      groupId: Number(groupId),
    });

    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e?.message ?? 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
