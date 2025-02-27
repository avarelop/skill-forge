package entities

type Employee struct {
	ID int
	Person
}

// This is how we create a method for the Employee struct.
// They are called receiver functions.

// This is how we create a constructor for the Employee struct.
// It is a function that returns a pointer to an Employee struct.
func NewEmployee(id int, name string, age int) *Employee {
	return &Employee{
		ID: id,
		Person: Person{
			Name: name,
			Age:  age,
		},
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
