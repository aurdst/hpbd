const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");

const CSV_STUDENTS = "students.csv";
const CSV_TEACHERS = "intervenants.csv";

exports.getTodaysBirthday = async (req, res) => {
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL'); //=> '2014 août 06'

    const STUDENTS_BIRTHDAY = await parseService.parseFile(CSV_STUDENTS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    const TEACHERS_BIRTHDAY = await parseService.parseFile(CSV_TEACHERS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    res.json({
        count_total: STUDENTS_BIRTHDAY.length + TEACHERS_BIRTHDAY.length,
        students_birthday : STUDENTS_BIRTHDAY,
        teachers_birthday : TEACHERS_BIRTHDAY
    })
}

// exports.insertIntoDb = async (req, res) => {
//     const csvToInsert
// }


