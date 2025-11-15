import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Teacher } from './src/models/teacher.model.js';
import { course } from './src/models/course.model.js';

dotenv.config({ path: './.env' });

const MONGO = `${process.env.MONGODB_URL}/eLearning`;

async function run() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB for seeding');

    // Teachers to create - multiple for each subject
    const teachers = [
      // Physics Teachers
      {
        Email: 'urttsg@gmail.com',
        Firstname: 'Uttam',
        Lastname: 'Tseg',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'physics.teacher2@example.com',
        Firstname: 'Albert',
        Lastname: 'Newton',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'physics.teacher3@example.com',
        Firstname: 'Marie',
        Lastname: 'Curie',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      // Math Teachers
      {
        Email: 'seedteacher@example.com',
        Firstname: 'Seed',
        Lastname: 'Teacher',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'math.teacher2@example.com',
        Firstname: 'Srinivasa',
        Lastname: 'Ramanujan',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'math.teacher3@example.com',
        Firstname: 'Ada',
        Lastname: 'Lovelace',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      // Chemistry Teachers
      {
        Email: 'chemistry.teacher1@example.com',
        Firstname: 'Dmitri',
        Lastname: 'Mendeleev',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'chemistry.teacher2@example.com',
        Firstname: 'Rosalind',
        Lastname: 'Franklin',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'chemistry.teacher3@example.com',
        Firstname: 'Linus',
        Lastname: 'Pauling',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      // Biology Teachers
      {
        Email: 'biology.teacher1@example.com',
        Firstname: 'Charles',
        Lastname: 'Darwin',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'biology.teacher2@example.com',
        Firstname: 'Jane',
        Lastname: 'Goodall',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'biology.teacher3@example.com',
        Firstname: 'Gregor',
        Lastname: 'Mendel',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      // Computer Teachers
      {
        Email: 'computer.teacher1@example.com',
        Firstname: 'Alan',
        Lastname: 'Turing',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'computer.teacher2@example.com',
        Firstname: 'Grace',
        Lastname: 'Hopper',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      },
      {
        Email: 'computer.teacher3@example.com',
        Firstname: 'Dennis',
        Lastname: 'Ritchie',
        Password: 'Password123!',
        Isverified: true,
        Isapproved: 'approved'
      }
    ];

    const createdTeachers = [];

    for (const t of teachers) {
      let existing = await Teacher.findOne({ Email: t.Email });
      if (existing) {
        console.log(`Teacher already exists: ${t.Email}`);
        createdTeachers.push(existing);
      } else {
        const created = await Teacher.create(t);
        console.log(`Created teacher: ${created.Email}`);
        createdTeachers.push(created);
      }
    }

    // Courses to create - 3 teachers per subject
    const courses = [
      // Physics courses (teachers 0, 1, 2)
      {
        coursename: 'physics',
        description: 'Introductory Physics - Mechanics and Thermodynamics',
        enrolledteacher: createdTeachers[0]._id,
        isapproved: true
      },
      {
        coursename: 'physics',
        description: 'Advanced Physics - Quantum Mechanics and Relativity',
        enrolledteacher: createdTeachers[1]._id,
        isapproved: true
      },
      {
        coursename: 'physics',
        description: 'Physics Fundamentals - Electricity and Magnetism',
        enrolledteacher: createdTeachers[2]._id,
        isapproved: true
      },
      // Math courses (teachers 3, 4, 5)
      {
        coursename: 'math',
        description: 'Comprehensive Mathematics - Algebra and Calculus',
        enrolledteacher: createdTeachers[3]._id,
        isapproved: true
      },
      {
        coursename: 'math',
        description: 'Advanced Mathematics - Number Theory and Analysis',
        enrolledteacher: createdTeachers[4]._id,
        isapproved: true
      },
      {
        coursename: 'math',
        description: 'Applied Mathematics - Statistics and Probability',
        enrolledteacher: createdTeachers[5]._id,
        isapproved: true
      },
      // Chemistry courses (teachers 6, 7, 8)
      {
        coursename: 'chemistry',
        description: 'General Chemistry - Atomic Structure and Periodic Table',
        enrolledteacher: createdTeachers[6]._id,
        isapproved: true
      },
      {
        coursename: 'chemistry',
        description: 'Organic Chemistry - Compounds and Reactions',
        enrolledteacher: createdTeachers[7]._id,
        isapproved: true
      },
      {
        coursename: 'chemistry',
        description: 'Physical Chemistry - Thermodynamics and Kinetics',
        enrolledteacher: createdTeachers[8]._id,
        isapproved: true
      },
      // Biology courses (teachers 9, 10, 11)
      {
        coursename: 'biology',
        description: 'General Biology - Cell Structure and Evolution',
        enrolledteacher: createdTeachers[9]._id,
        isapproved: true
      },
      {
        coursename: 'biology',
        description: 'Ecology and Environmental Biology',
        enrolledteacher: createdTeachers[10]._id,
        isapproved: true
      },
      {
        coursename: 'biology',
        description: 'Genetics and Molecular Biology',
        enrolledteacher: createdTeachers[11]._id,
        isapproved: true
      },
      // Computer courses (teachers 12, 13, 14)
      {
        coursename: 'computer',
        description: 'Computer Science Fundamentals - Algorithms and Data Structures',
        enrolledteacher: createdTeachers[12]._id,
        isapproved: true
      },
      {
        coursename: 'computer',
        description: 'Programming Languages - Design and Implementation',
        enrolledteacher: createdTeachers[13]._id,
        isapproved: true
      },
      {
        coursename: 'computer',
        description: 'Operating Systems and Computer Architecture',
        enrolledteacher: createdTeachers[14]._id,
        isapproved: true
      }
    ];

    for (const c of courses) {
      const exists = await course.findOne({ coursename: c.coursename, enrolledteacher: c.enrolledteacher });
      if (exists) {
        console.log(`Course already exists: ${c.coursename} for teacher ${c.enrolledteacher}`);
      } else {
        const createdCourse = await course.create(c);
        console.log(`Created course: ${createdCourse.coursename} (id: ${createdCourse._id})`);
      }
    }

    console.log('\nSeeding complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

run();
