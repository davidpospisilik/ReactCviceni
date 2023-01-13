import React, { useState, useRef } from "react";
import { PageContainer, EmployeeList, EmployeeItem, EmployeeForm, Buttons, TabButton, KillTheEmployee, PlanButton } from "./homeStyles";
import { employee } from "./employeeData";

export default function Home() {
	const employeeCount = useRef(employee.length);
	const [listOfEmployee, setListOfEmployee] = useState(employee);
	const [activeTab, setActiveTab] = useState('list-of-employee');
	const [assignment, setAssignment] = useState({
		meters: 1,
		timeInHours: 1,
	});
	const [tempAssignment, setTempAssignment] = useState({
		meters: "",
		timeInHours: "",
	});
	const dogsRequirements = {
		meters: 6,
		timeInHours: 1,
	};

	let employeeCondition = 0;

	const [addEmployee, setAddEmployee] = useState({
		id: (employeeCount.current + 1),
		firstName: "",
		lastName: "",
		sex: "",
		age: 0,
	});
	const handleChange = (e) => {
		setAddEmployee({...addEmployee, [e.target.name]: e.target.value});
	};
	const handleAdd = async (e) => {
		e.preventDefault();

		
		await setListOfEmployee((listOfEmployee) => {
			return [...listOfEmployee, addEmployee];
		});
		employeeCount.current++;
		await setAddEmployee({
			id: (employeeCount.current + 1),
			firstName: "",
			lastName: "",
			sex: "",
			age: 0
		});
	
	};
	const handleDelete = (id) => {
		setListOfEmployee(listOfEmployee.filter( employee => employee.id != id));
	};
	const handleStorage = (e) => {
		setTempAssignment({ ...tempAssignment, [e.target.name]: e.target.value});
	};
	const updateAssignment = async () => {
		const assignmentValue = tempAssignment;
		let newassignmentValue = {};
		// assignmentValue = {meters: "", timeInHours: "", pills: ""}
		const keys = Object.keys(assignmentValue);
		// keys = ['meters', 'timeInHours', 'pills']
		// key = keys[1]
		keys.map((key) => {
			// assignmentValue.timeInHours
			if (parseInt(assignmentValue[key])) {
				newassignmentValue[key] = parseInt(assignment[key]) + parseInt(assignmentValue[key]);
			} else {
				newassignmentValue[key] = parseInt(assignment[key]);
			}
		})
		await setAssignment(newassignmentValue);
		await setTempAssignment({ meters: "", timeInHours: "", pills: ""});
	};
	const switchTab = (e, newValue) => {
		e.preventDefault();
		const newActiveTab = newValue;
		setActiveTab(newActiveTab);
	};
	// useEffect(() => {
	// 	setPushDog(false);
	// }, [listOfEmployee])

	for (let i = 0; i < listOfEmployee.length; i++) {
		if(listOfEmployee[i].sex === "W"){
			employeeCondition += 0.5 ;
		}else{
			employeeCondition += 1;
		}
	}

	let pozadovanyVykon = assignment.meters / assignment.timeInHours;

	let isDisabled = false;
	let finalMsg = "";

	if (employeeCondition >= pozadovanyVykon){
		isDisabled = false;
		finalMsg = "Mas dostatek zamestnancu pro zadanou praci.";
	}else{
		isDisabled = true;
		finalMsg = "Pridej zamestanance!";
	}

	// const verifyCondition = (pozadovanyVykon, employeeCondition) =>{
	// 	if (employeeCondition >= pozadovanyVykon){
	// 		return false;
	// 	}else{
	// 		return true;
	// 	}
	// }

	return (
		<PageContainer>
			<Buttons>
				<TabButton name="list-of-employee" activeTab={activeTab} onClick={(event) => { switchTab(event, 'list-of-employee') }}>
					Seznam zamestnancu
				</TabButton>
				<TabButton name="assignment" activeTab={activeTab} onClick={(event) => { switchTab(event, 'assignment') }}>
					Vykopove prace
				</TabButton>
			</Buttons>
			{ (activeTab === 'list-of-employee') && 
				<>
					<EmployeeList name="dogList">
						{
								listOfEmployee.map((employee) => (
									<EmployeeItem key={employee.id} name={employee.name}>
										{employee.firstName} / {employee.lastName} / {employee.sex} / {employee.age}
										<KillTheEmployee
											onClick={() => {handleDelete(employee.id)}}
										>
											x
										</KillTheEmployee>
									</EmployeeItem>
								))
						}
					</EmployeeList>
					<div style={{color: 'white', height: 'auto', width: "300px", margin: "1rem"}}>
						<p >Vykon zamestnancu za hodinu: {employeeCondition} metru</p>
						<p>Pozadovany vykon za hodinu: {pozadovanyVykon.toFixed(1)} metru</p>
					</div>

					<EmployeeForm name="employeeForm">
						<input
							type="text"
							placeholder="jméno zamestantnce"
							className="inputClass"
							name="firstName"
							value={addEmployee.firstName}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="prijmeni zamestantnce"
							className="inputClass"
							name="lastName"
							value={addEmployee.lastName}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="pohlavi M/W"
							className="inputClass"
							name="sex"
							value={addEmployee.sex}
							onChange={handleChange}
						/>
						<input
							type="number"
							min="15"
							max="65"
							placeholder="věk zamestnance"
							className="inputClass"
							name="age"
							value={addEmployee.age}
							onChange={handleChange}
						/>
						<button
							className="inputClass"
							onClick={handleAdd}
						>
							Přidat
						</button>
					</EmployeeForm>
				</>
			}
			{ (activeTab === 'assignment') &&
				<>
					<EmployeeForm style={{ flexDirection: 'column '}}>
						<div
							className="inputClass"
							style={{color: 'white', height: 'auto', width: "200px"}}
						>
							<b>Vykopove prace</b>
							<p>
								pozadovane metry: {assignment.meters}, 
								pozadovany cas: {assignment.timeInHours}, 
							</p>
						</div>
						<input
							type="number"
							placeholder="pocet metru"
							className="inputClass"
							name="meters"
							value={tempAssignment.meters}
							onChange={handleStorage}
						/>
						<input
							type="number"
							placeholder="pozadovany cas"
							className="inputClass"
							name="timeInHours"
							value={tempAssignment.timeInHours}
							onChange={handleStorage}
						/>
						{/* <button
							className="inputClass"
							onClick={updateAssignment}
						>
							Pridat ukol
						</button> */}
					</EmployeeForm>
					<div style = {{color: 'white', height: 'auto', width: "400px"}}>{finalMsg}</div>
						
					<PlanButton id ="planButton" name="assignment" vykonZamestnancu = {employeeCondition} conditionRequirment={pozadovanyVykon} disabled = {isDisabled} onClick={updateAssignment}>
					Naplanovat praci
				</PlanButton>

				</>
			}
		</PageContainer>
	);
}