package entities

import "fmt"

type Employee struct {
	ID   int
	Name string
	Age  int
}

func main() {
	// This is how we create an instance of the Employee struct
	employee := Employee{
		ID:   1,
		Name: "John Doe",
		Age:  30,
	}

	// This is how we create an instance of the Employee struct
	employee_2 := Employee{}
	employee_2.ID = 2
	employee_2.Name = "Jane Doe"
	employee_2.Age = 25

	// This is how we create an instance of the Employee struct
	employee_3 := new(Employee) // This is a pointer to an Employee struct

	// This is how we create an instance of the Employee struct using the constructor
	employee_4 := NewEmployee(4, "John Smith", 35)

	fmt.Println(employee)
	fmt.Println(employee_2)
	fmt.Println(employee_3)
	fmt.Println(employee_4)
}

// This is how we create a method for the Employee struct.
// They are called receiver functions.

// This is how we create a constructor for the Employee struct.
// It is a function that returns a pointer to an Employee struct.
func NewEmployee(id int, name string, age int) *Employee {
	return &Employee{
		ID:   id,
		Name: name,
		Age:  age,
	}
}

func (e *Employee) SetID(id int) {
	e.ID = id
}

func (e *Employee) SetName(name string) {
	e.Name = name
}

func (e *Employee) SetAge(age int) {
	e.Age = age
}

func (e *Employee) GetId() int {
	return e.ID
}
