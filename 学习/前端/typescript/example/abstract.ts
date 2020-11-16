abstract class Department {
    name: string

    constructor(name: string) {
        this.name = name
    }

    printName(): void {
        console.log(`this department is ${this.name}`)
    }

    abstract printMeeting(): void
}

class AccountingDepartment extends Department {
    constructor(name: string) {
        super(name)
    }
    printMeeting(): void {
        console.log(`The Accounting Department meet each Monday at 10am`)
    }
    generateReports(): void {
        console.log('Generating accounting reports ...')
    }
}

let acc: Department
