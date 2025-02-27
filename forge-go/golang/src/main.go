package main

import (
	"fmt"

	"golang/forge-go/golang/src/entities"
)

func main() {
	// This is how we create an instance of the Employee struct
	employee := entities.Employee{
		ID: 1,
		Person: entities.Person{
			Name: "John Doe",
			Age:  30,
		},
	}

	// This is how we create an instance of the Employee struct
	employee_2 := entities.Employee{}
	employee_2.ID = 2
	employee_2.Person.Name = "Jane Doe"
	employee_2.Person.Age = 25

	// This is how we create an instance of the Employee struct
	employee_3 := new(entities.Employee) // This is a pointer to an Employee struct

	// This is how we create an instance of the Employee struct using the constructor
	employee_4 := entities.NewEmployee(4, "John Smith", 35)

	fmt.Println(employee)
	fmt.Println(employee_2)
	fmt.Println(employee_3)
	fmt.Println(employee_4)
}
