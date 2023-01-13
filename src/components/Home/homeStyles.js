import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #2A2929;
`;

export const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: trasparent;
`;

export const EmployeeItem = styled.div`
  display: block;
  height: 30px;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  justify-content: space-between;
  background-color: #f4f2f3;
  &:nth-child(even) {
    background-color: #90BDC2;
  }
`;

export const EmployeeForm = styled(EmployeeList)`
  flex-direction: row;
  margin:  20px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;

export const Buttons = styled(EmployeeForm)`
  margin: 30px 0;
  height: 40px;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border 1px solid white;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  ${props => {
    if (props.name === props.activeTab) {
      return `
        background-color: rgba(255, 255, 255, 0.3);
      `;
    }
  }}
`;

export const KillTheEmployee = styled.div`
  display: flex;
  position: relative;
  z-index: 50;
  height: 20px;
  width: 20px;
  right:0;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  color: red;
  top: -20px;
  border-radius: 50%;
  border: 1px solid red;
  cursor: pointer;
`;
export const PlanButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  height: 100%;
  width: 170px;
  border 1px solid white;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: "red";
  ${props => {
    if (props.vykonZamestnancu >= props.conditionRequirment) {
      return `
        background-color: #029517;
      ` ;
    }else{
      return `
        background-color: #EB4D5A;
        cursor:no-drop;
      `
    }
  }}
`;
  