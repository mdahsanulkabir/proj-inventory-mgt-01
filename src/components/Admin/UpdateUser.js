// ? Admin can create a new user with this form
// ? email should be fixed, user can change the displayName
// ? initially the password will be set as - Singer@!123. User must changer his/her password while 
// ? first log in
// ? User must verify his/her email. (Admin can by pass the verification in Update user form)
// ? Until verification, the account will be disabled and cannot access any route

import { ManageAccounts, Person } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useReducer, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PropTypes from 'prop-types';


//function for tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


// initial state of the form
const allUserInitialState = [];
const reducerAllUserCredentials = (state, action) => {
    switch ( action.type ) {
        case 'INITIALISE_USERS':    return action.payload;
        case 'email':               return { ...state, userEmail : action.payload};
        case 'displayName':         return { ...state, displayName : action.payload};
        case 'error':               return { ...state, error : action.payload};
        case 'reset':               return allUserInitialState;
        default:                    throw new Error(`Unknown action type: ${action.type}`);
    }
}


const selectedUserInitialState = {
    uid: '',
    email: '',
    phoneNumber: '',
    emailVerified:false,
    displayName:'',
    disabled:false
};
const reducerSelectedUser = (state, action) => {
    if(action.payload === 'true') action.payload = true;
    if(action.payload === 'false') action.payload = false;
    switch ( action.type ) {
        case 'Initialise_selectedUser': return action.payload;
        case 'displayName':             return { ...state, displayName : action.payload };
        case 'phoneNumber':             return { ...state, phoneNumber : action.payload };
        case 'disabled':                return { ...state, disabled: action.payload};
        case 'emailVerify':             return { ...state, emailVerified: action.payload};
        case 'reset':                   return { ...state, error : action.payload};
        default:                        throw new Error(`Unknown action type: ${action.type}`);
    }
}

const UpdateUser = () => {
    
    const [ allUserCredentialsState, dispatchAllUserCredentials ]       = useReducer ( reducerAllUserCredentials, allUserInitialState );
    const [ selectedUserCredential, dispatchSelectedUserCredential ]    = useReducer ( reducerSelectedUser , selectedUserInitialState );
    

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    let access = []

    const accessControlInitialState = {
        createUser: false,
        modifyUser: false,
    
        createPart: false,
        modifyPart: false,
        createSFG: false,
        modifySFG: false,
        create3rdPartySFG: false,
        modify3rdPartySFG: false,
        addUnit: false,
    
        lcEntry: false,
        lcEdit: false,
    
        storeRmRecvEntry:false,
        storeRmRecvEdit:false,
    
        warehouseCreate: false,
        warehouseModify: false,
    
        srFromOtherThanProdAndQC: false,
        srFromQC: false,
        srFromThermoforming: false,
        srFromDoorFoaming: false,
        srFromPowerPress: false,
        srFromRollForming: false,
        srFromEvaWrap: false,
        srFromPreAssembly: false,
        srFromBodyFoaming: false,
        srFromPostAssembly: false,
        srFromFinishingLine: false,
        srFromUShell: false,
        srFromHeaters: false,
        srFromPadPrint: false,
        srFromHotStamp: false,
        srFromClinching: false,
        srFromServiceInternal: false,
    
        deliveryFromFirstShed: false,
        deliveryFromThirdShed: false,
        deliveryFromForthShed: false,
        deliveryFromFGShed: false,
        deliveryFromOutsideShed: false,
        deliveryFromSMCPremises: false,
        deliveryFromQC: false,
        deliveryFromThermoforming: false,
        deliveryFromDoorFoaming: false,
        deliveryFromPowerPress: false,
        deliveryFromRollForming: false,
        deliveryFromEvaWrap: false,
        deliveryFromPreAssembly: false,
        deliveryFromBodyFoaming: false,
        deliveryFromPostAssembly: false,
        deliveryFromFinishingLine: false,
        deliveryFromUShell: false,
        deliveryFromHeaters: false,
        deliveryFromPadPrint: false,
        deliveryFromHotStamp: false,
        deliveryFromClinching: false,
        deliveryFromServiceInternal: false,
    
        rmRcvOtherThanProdAndQC: false,
        rmRcvQC: false,
        rmRcvThermoforming: false,
        rmRcvDoorFoaming: false,
        rmRcvPowerPress: false,
        rmRcvRollForming: false,
        rmRcvEvaWrap: false,
        rmRcvPreAssembly: false,
        rmRcvBodyFoaming: false,
        rmRcvPostAssembly: false,
        rmRcvFinishingLine: false,
        rmRcvUShell: false,
        rmRcvHeaters: false,
        rmRcvPadPrint: false,
        rmRcvHotStamp: false,
        rmRcvClinching: false,
    
        rmPush: false,
    
        fgProdEntry: false,
        fgProdEdit: false,
        gasChargingProdEntry: false,
        gasChargingProdEdit: false,
        postDoorFittingProdEntry: false,
        postDoorFittingProdEdit: false,
        bodyFoamingProdEntry: false,
        bodyFoamingProdEdit: false,
        preAssemblyProdEntry: false,
        preAssemblyProdEdit: false,
        evaWrapProdEntry: false,
        evaWrapProdEdit: false,
        thermoformingProdEntry: false,
        thermoformingProdEdit: false,
        doorFoamingProdEntry: false,
        doorFoamingProdEdit: false,
        powerPressProdEntry: false,
        powerPressProdEdit: false,
        sideSheetProdEntry: false,
        sideSheetProdEdit: false,
        uShellProdEntry: false,
        uShellProdEdit: false,
        heaterProdEntry: false,
        heaterProdEdit: false,
        clinchingProdEntry: false,
        clinchingProdEdit: false,
        padPrintProdEntry: false,
        padPrintProdEdit: false,
        hotStampProdEntry: false,
        hotStampProdEdit: false,
    
        iqcEntry: false,
        iqcEdit: false,
        osdEntry: false,
        osdEdit: false,
        SSCSR: false,
    
        disposalRequest: false,
        disposalApproval: false,
    }

    const createUser = useRef(accessControlInitialState.createUser);
    const modifyUser = useRef(accessControlInitialState.modifyUser);
    const createPart = useRef(accessControlInitialState.createPart);
    const modifyPart = useRef(accessControlInitialState.modifyPart);
    const createSFG = useRef(accessControlInitialState.createSFG);
    const modifySFG = useRef(accessControlInitialState.modifySFG);
    const create3rdPartySFG = useRef(accessControlInitialState.create3rdPartySFG);
    const modify3rdPartySFG = useRef(accessControlInitialState.modify3rdPartySFG);
    const addUnit = useRef(accessControlInitialState.addUnit);
    const lcEntry = useRef(accessControlInitialState.lcEntry);
    const lcEdit = useRef(accessControlInitialState.lcEdit);
    const storeRmRecvEntry = useRef(accessControlInitialState.storeRmRecvEntry);
    const storeRmRecvEdit = useRef(accessControlInitialState.storeRmRecvEdit);
    const warehouseCreate = useRef(accessControlInitialState.warehouseCreate);
    const warehouseModify = useRef(accessControlInitialState.warehouseModify);
    const srFromOtherThanProdAndQC = useRef(accessControlInitialState.srFromOtherThanProdAndQC);
    const srFromQC = useRef(accessControlInitialState.srFromQC);
    const srFromThermoforming = useRef(accessControlInitialState.srFromThermoforming);
    const srFromDoorFoaming = useRef(accessControlInitialState.srFromDoorFoaming);
    const srFromPowerPress = useRef(accessControlInitialState.srFromPowerPress);
    const srFromRollForming = useRef(accessControlInitialState.srFromRollForming);
    const srFromEvaWrap = useRef(accessControlInitialState.srFromEvaWrap);
    const srFromPreAssembly = useRef(accessControlInitialState.srFromPreAssembly);
    const srFromBodyFoaming = useRef(accessControlInitialState.srFromBodyFoaming);
    const srFromPostAssembly = useRef(accessControlInitialState.srFromPostAssembly);
    const srFromFinishingLine = useRef(accessControlInitialState.srFromFinishingLine);
    const srFromUShell = useRef(accessControlInitialState.srFromUShell);
    const srFromHeaters = useRef(accessControlInitialState.srFromHeaters);
    const srFromPadPrint = useRef(accessControlInitialState.srFromPadPrint);
    const srFromHotStamp = useRef(accessControlInitialState.srFromHotStamp);
    const srFromClinching = useRef(accessControlInitialState.srFromClinching);
    const srFromServiceInternal = useRef(accessControlInitialState.srFromServiceInternal);
    const deliveryFromFirstShed = useRef(accessControlInitialState.deliveryFromFirstShed);
    const deliveryFromThirdShed = useRef(accessControlInitialState.deliveryFromThirdShed);
    const deliveryFromForthShed = useRef(accessControlInitialState.deliveryFromForthShed);
    const deliveryFromFGShed = useRef(accessControlInitialState.deliveryFromFGShed);
    const deliveryFromOutsideShed = useRef(accessControlInitialState.deliveryFromOutsideShed);
    const deliveryFromSMCPremises = useRef(accessControlInitialState.deliveryFromSMCPremises);
    const deliveryFromQC = useRef(accessControlInitialState.deliveryFromQC);
    const deliveryFromThermoforming = useRef(accessControlInitialState.deliveryFromThermoforming);
    const deliveryFromDoorFoaming = useRef(accessControlInitialState.deliveryFromDoorFoaming);
    const deliveryFromPowerPress = useRef(accessControlInitialState.deliveryFromPowerPress);
    const deliveryFromRollForming = useRef(accessControlInitialState.deliveryFromRollForming);
    const deliveryFromEvaWrap = useRef(accessControlInitialState.deliveryFromEvaWrap);
    const deliveryFromPreAssembly = useRef(accessControlInitialState.deliveryFromPreAssembly);
    const deliveryFromBodyFoaming = useRef(accessControlInitialState.deliveryFromBodyFoaming);
    const deliveryFromPostAssembly = useRef(accessControlInitialState.deliveryFromPostAssembly);
    const deliveryFromFinishingLine = useRef(accessControlInitialState.deliveryFromFinishingLine);
    const deliveryFromUShell = useRef(accessControlInitialState.deliveryFromUShell);
    const deliveryFromHeaters = useRef(accessControlInitialState.deliveryFromHeaters);
    const deliveryFromPadPrint = useRef(accessControlInitialState.deliveryFromPadPrint);
    const deliveryFromHotStamp = useRef(accessControlInitialState.deliveryFromHotStamp);
    const deliveryFromClinching = useRef(accessControlInitialState.deliveryFromClinching);
    const deliveryFromServiceInternal = useRef(accessControlInitialState.deliveryFromServiceInternal);
    const rmRcvOtherThanProdAndQC = useRef(accessControlInitialState.rmRcvOtherThanProdAndQC);
    const rmRcvQC = useRef(accessControlInitialState.rmRcvQC);
    const rmRcvThermoforming = useRef(accessControlInitialState.rmRcvThermoforming);
    const rmRcvDoorFoaming = useRef(accessControlInitialState.rmRcvDoorFoaming);
    const rmRcvPowerPress = useRef(accessControlInitialState.rmRcvPowerPress);
    const rmRcvRollForming = useRef(accessControlInitialState.rmRcvRollForming);
    const rmRcvEvaWrap = useRef(accessControlInitialState.rmRcvEvaWrap);
    const rmRcvPreAssembly = useRef(accessControlInitialState.rmRcvPreAssembly);
    const rmRcvBodyFoaming = useRef(accessControlInitialState.rmRcvBodyFoaming);
    const rmRcvPostAssembly = useRef(accessControlInitialState.rmRcvPostAssembly);
    const rmRcvFinishingLine = useRef(accessControlInitialState.rmRcvFinishingLine);
    const rmRcvUShell = useRef(accessControlInitialState.rmRcvUShell);
    const rmRcvHeaters = useRef(accessControlInitialState.rmRcvHeaters);
    const rmRcvPadPrint = useRef(accessControlInitialState.rmRcvPadPrint);
    const rmRcvHotStamp = useRef(accessControlInitialState.rmRcvHotStamp);
    const rmRcvClinching = useRef(accessControlInitialState.rmRcvClinching);
    const rmPush = useRef(accessControlInitialState.rmPush);
    const fgProdEntry = useRef(accessControlInitialState.fgProdEntry);
    const fgProdEdit = useRef(accessControlInitialState.fgProdEdit);
    const gasChargingProdEntry = useRef(accessControlInitialState.gasChargingProdEntry);
    const gasChargingProdEdit = useRef(accessControlInitialState.gasChargingProdEdit);
    const postDoorFittingProdEntry = useRef(accessControlInitialState.postDoorFittingProdEntry);
    const postDoorFittingProdEdit = useRef(accessControlInitialState.postDoorFittingProdEdit);
    const bodyFoamingProdEntry = useRef(accessControlInitialState.bodyFoamingProdEntry);
    const bodyFoamingProdEdit = useRef(accessControlInitialState.bodyFoamingProdEdit);
    const preAssemblyProdEntry = useRef(accessControlInitialState.preAssemblyProdEntry);
    const preAssemblyProdEdit = useRef(accessControlInitialState.preAssemblyProdEdit);
    const evaWrapProdEntry = useRef(accessControlInitialState.evaWrapProdEntry);
    const evaWrapProdEdit = useRef(accessControlInitialState.evaWrapProdEdit);
    const thermoformingProdEntry = useRef(accessControlInitialState.thermoformingProdEntry);
    const thermoformingProdEdit = useRef(accessControlInitialState.thermoformingProdEdit);
    const doorFoamingProdEntry = useRef(accessControlInitialState.doorFoamingProdEntry);
    const doorFoamingProdEdit = useRef(accessControlInitialState.doorFoamingProdEdit);
    const powerPressProdEntry = useRef(accessControlInitialState.powerPressProdEntry);
    const powerPressProdEdit = useRef(accessControlInitialState.powerPressProdEdit);
    const sideSheetProdEntry = useRef(accessControlInitialState.sideSheetProdEntry);
    const sideSheetProdEdit = useRef(accessControlInitialState.sideSheetProdEdit);
    const uShellProdEntry = useRef(accessControlInitialState.uShellProdEntry);
    const uShellProdEdit = useRef(accessControlInitialState.uShellProdEdit);
    const heaterProdEntry = useRef(accessControlInitialState.heaterProdEntry);
    const heaterProdEdit = useRef(accessControlInitialState.heaterProdEdit);
    const clinchingProdEntry = useRef(accessControlInitialState.clinchingProdEntry);
    const clinchingProdEdit = useRef(accessControlInitialState.clinchingProdEdit);
    const padPrintProdEntry = useRef(accessControlInitialState.padPrintProdEntry);
    const padPrintProdEdit = useRef(accessControlInitialState.padPrintProdEdit);
    const hotStampProdEntry = useRef(accessControlInitialState.hotStampProdEntry);
    const hotStampProdEdit = useRef(accessControlInitialState.hotStampProdEdit);
    const iqcEntry = useRef(accessControlInitialState.iqcEntry);
    const iqcEdit = useRef(accessControlInitialState.iqcEdit);
    const osdEntry = useRef(accessControlInitialState.osdEntry);
    const osdEdit = useRef(accessControlInitialState.osdEdit);
    const SSCSR = useRef(accessControlInitialState.SSCSR);
    const disposalRequest = useRef(accessControlInitialState.disposalRequest);
    const disposalApproval = useRef(accessControlInitialState.disposalApproval);


    // TODO Move the token to global level and use useContext 
    const [ token, setToken ] = useState('');
    const [user] = useAuthState(auth);
    useEffect(()=> {
        if(user){
            user.getIdToken(true)
            .then(res => setToken(res))
            .catch(error => console.log(error))
        }
        },[user])
    

    //? loading all user credentials
    useEffect( () => {
        fetch(`http://localhost:5000/api/getUsers`, {
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + token,
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatchAllUserCredentials({
                type: 'INITIALISE_USERS',
                payload: data
            })
        })
        .catch(error => console.log(error))
    },[selectedUserCredential])  //TODO it is not a good approach. because we are unnecessarily re-rendering of every input change while typing data in textfields
                                 //TODO we can use useRef();

    allUserCredentialsState && console.log(allUserCredentialsState);

    const handleSelectedUser = (email) => {
        const selectedUser = allUserCredentialsState.find(getuser => getuser.email === email);
        dispatchSelectedUserCredential({
            type: 'Initialise_selectedUser',
            payload: selectedUser
        })
        console.log(selectedUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedUserCredential);

        //? below codes are for the API
        const response = await fetch(`http://localhost:5000/api/update-user`, {
            method: "PATCH",
            // TODO we need to limit the userCredential data to only required ones
            body: JSON.stringify(selectedUserCredential),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });

        const json = await response.json();
        

        if (!response.ok) {
            dispatchSelectedUserCredential({ type : 'error', payload : json.error})
        }

        if(response.ok){
            dispatchSelectedUserCredential({ type : 'reset'})
            console.log(`an user updated`);
        }
    }



    const handleAccessRecordSave = async () => {
        createUser.current.checked && access.push("createUser");
        modifyUser.current.checked && access.push("modifyUser");
        createPart.current.checked && access.push("createPart");
        modifyPart.current.checked && access.push("modifyPart");
        createSFG.current.checked && access.push("createSFG");
        modifySFG.current.checked && access.push("modifySFG");
        create3rdPartySFG.current.checked && access.push("create3rdPartySFG");
        modify3rdPartySFG.current.checked && access.push("modify3rdPartySFG");
        addUnit.current.checked && access.push("addUnit");
        lcEntry.current.checked && access.push("lcEntry");
        lcEdit.current.checked && access.push("lcEdit");
        storeRmRecvEntry.current.checked && access.push("storeRmRecvEntry");
        storeRmRecvEdit.current.checked && access.push("storeRmRecvEdit");
        warehouseCreate.current.checked && access.push("warehouseCreate");
        warehouseModify.current.checked && access.push("warehouseModify");
        srFromOtherThanProdAndQC.current.checked && access.push("srFromOtherThanProdAndQC");
        srFromQC.current.checked && access.push("srFromQC");
        srFromThermoforming.current.checked && access.push("srFromThermoforming");
        srFromDoorFoaming.current.checked && access.push("srFromDoorFoaming");
        srFromPowerPress.current.checked && access.push("srFromPowerPress");
        srFromRollForming.current.checked && access.push("srFromRollForming");
        srFromEvaWrap.current.checked && access.push("srFromEvaWrap");
        srFromPreAssembly.current.checked && access.push("srFromPreAssembly");
        srFromBodyFoaming.current.checked && access.push("srFromBodyFoaming");
        srFromPostAssembly.current.checked && access.push("srFromPostAssembly");
        srFromFinishingLine.current.checked && access.push("srFromFinishingLine");
        srFromUShell.current.checked && access.push("srFromUShell");
        srFromHeaters.current.checked && access.push("srFromHeaters");
        srFromPadPrint.current.checked && access.push("srFromPadPrint");
        srFromHotStamp.current.checked && access.push("srFromHotStamp");
        srFromClinching.current.checked && access.push("srFromClinching");
        srFromServiceInternal.current.checked && access.push("srFromServiceInternal");
        deliveryFromFirstShed.current.checked && access.push("deliveryFromFirstShed");
        deliveryFromThirdShed.current.checked && access.push("deliveryFromThirdShed");
        deliveryFromForthShed.current.checked && access.push("deliveryFromForthShed");
        deliveryFromFGShed.current.checked && access.push("deliveryFromFGShed");
        deliveryFromOutsideShed.current.checked && access.push("deliveryFromOutsideShed");
        deliveryFromSMCPremises.current.checked && access.push("deliveryFromSMCPremises");
        deliveryFromQC.current.checked && access.push("deliveryFromQC");
        deliveryFromThermoforming.current.checked && access.push("deliveryFromThermoforming");
        deliveryFromDoorFoaming.current.checked && access.push("deliveryFromDoorFoaming");
        deliveryFromPowerPress.current.checked && access.push("deliveryFromPowerPress");
        deliveryFromRollForming.current.checked && access.push("deliveryFromRollForming");
        deliveryFromEvaWrap.current.checked && access.push("deliveryFromEvaWrap");
        deliveryFromPreAssembly.current.checked && access.push("deliveryFromPreAssembly");
        deliveryFromBodyFoaming.current.checked && access.push("deliveryFromBodyFoaming");
        deliveryFromPostAssembly.current.checked && access.push("deliveryFromPostAssembly");
        deliveryFromFinishingLine.current.checked && access.push("deliveryFromFinishingLine");
        deliveryFromUShell.current.checked && access.push("deliveryFromUShell");
        deliveryFromHeaters.current.checked && access.push("deliveryFromHeaters");
        deliveryFromPadPrint.current.checked && access.push("deliveryFromPadPrint");
        deliveryFromHotStamp.current.checked && access.push("deliveryFromHotStamp");
        deliveryFromClinching.current.checked && access.push("deliveryFromClinching");
        deliveryFromServiceInternal.current.checked && access.push("deliveryFromServiceInternal");
        rmRcvOtherThanProdAndQC.current.checked && access.push("rmRcvOtherThanProdAndQC");
        rmRcvQC.current.checked && access.push("rmRcvQC");
        rmRcvThermoforming.current.checked && access.push("rmRcvThermoforming");
        rmRcvDoorFoaming.current.checked && access.push("rmRcvDoorFoaming");
        rmRcvPowerPress.current.checked && access.push("rmRcvPowerPress");
        rmRcvRollForming.current.checked && access.push("rmRcvRollForming");
        rmRcvEvaWrap.current.checked && access.push("rmRcvEvaWrap");
        rmRcvPreAssembly.current.checked && access.push("rmRcvPreAssembly");
        rmRcvBodyFoaming.current.checked && access.push("rmRcvBodyFoaming");
        rmRcvPostAssembly.current.checked && access.push("rmRcvPostAssembly");
        rmRcvFinishingLine.current.checked && access.push("rmRcvFinishingLine");
        rmRcvUShell.current.checked && access.push("rmRcvUShell");
        rmRcvHeaters.current.checked && access.push("rmRcvHeaters");
        rmRcvPadPrint.current.checked && access.push("rmRcvPadPrint");
        rmRcvHotStamp.current.checked && access.push("rmRcvHotStamp");
        rmRcvClinching.current.checked && access.push("rmRcvClinching");
        rmPush.current.checked && access.push("rmPush");
        fgProdEntry.current.checked && access.push("fgProdEntry");
        fgProdEdit.current.checked && access.push("fgProdEdit");
        gasChargingProdEntry.current.checked && access.push("gasChargingProdEntry");
        gasChargingProdEdit.current.checked && access.push("gasChargingProdEdit");
        postDoorFittingProdEntry.current.checked && access.push("postDoorFittingProdEntry");
        postDoorFittingProdEdit.current.checked && access.push("postDoorFittingProdEdit");
        bodyFoamingProdEntry.current.checked && access.push("bodyFoamingProdEntry");
        bodyFoamingProdEdit.current.checked && access.push("bodyFoamingProdEdit");
        preAssemblyProdEntry.current.checked && access.push("preAssemblyProdEntry");
        preAssemblyProdEdit.current.checked && access.push("preAssemblyProdEdit");
        evaWrapProdEntry.current.checked && access.push("evaWrapProdEntry");
        evaWrapProdEdit.current.checked && access.push("evaWrapProdEdit");
        thermoformingProdEntry.current.checked && access.push("thermoformingProdEntry");
        thermoformingProdEdit.current.checked && access.push("thermoformingProdEdit");
        doorFoamingProdEntry.current.checked && access.push("doorFoamingProdEntry");
        doorFoamingProdEdit.current.checked && access.push("doorFoamingProdEdit");
        powerPressProdEntry.current.checked && access.push("powerPressProdEntry");
        powerPressProdEdit.current.checked && access.push("powerPressProdEdit");
        sideSheetProdEntry.current.checked && access.push("sideSheetProdEntry");
        sideSheetProdEdit.current.checked && access.push("sideSheetProdEdit");
        uShellProdEntry.current.checked && access.push("uShellProdEntry");
        uShellProdEdit.current.checked && access.push("uShellProdEdit");
        heaterProdEntry.current.checked && access.push("heaterProdEntry");
        heaterProdEdit.current.checked && access.push("heaterProdEdit");
        clinchingProdEntry.current.checked && access.push("clinchingProdEntry");
        clinchingProdEdit.current.checked && access.push("clinchingProdEdit");
        padPrintProdEntry.current.checked && access.push("padPrintProdEntry");
        padPrintProdEdit.current.checked && access.push("padPrintProdEdit");
        hotStampProdEntry.current.checked && access.push("hotStampProdEntry");
        hotStampProdEdit.current.checked && access.push("hotStampProdEdit");
        iqcEntry.current.checked && access.push("iqcEntry");
        iqcEdit.current.checked && access.push("iqcEdit");
        osdEntry.current.checked && access.push("osdEntry");
        osdEdit.current.checked && access.push("osdEdit");
        SSCSR.current.checked && access.push("SSCSR");
        disposalRequest.current.checked && access.push("disposalRequest");
        disposalApproval.current.checked && access.push("disposalApproval");

        const sendAccessData = { email: selectedUserCredential.email, access}
        console.log(access);
        const response = await fetch(`http://localhost:5000/api/update-user-access`, {
            method: "PATCH",
            body: JSON.stringify(sendAccessData),
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await response.json();
        access = [];
        if(!response.ok) {
            console.log(json.error);
            
        } else {
            console.log(json);
        }
    }

    console.log(selectedUserCredential);

    return (
        <Box>
            <CssBaseline />
            <Container>
                <Paper elevation = {3}>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
                        <ManageAccounts color="primary" sx={{ mr : 2 }}/>
                        <Typography variant="h6" component="h6" color="primary.main" align="center">Update existing user</Typography>
                    </Box>
                    <Box display="flex" sx={{mt : 3, height:"70vh"}}>
                        <Box align="center" sx={{ width: "50%", marginInline: '20px'}}>
                            <Typography>List of Users</Typography>
                            <List sx={{overflow: "auto", height:"60vh"}}>
                                {allUserCredentialsState?.map(user => {
                                    return (
                                            <ListItem disablePadding key={user.uid}>
                                                <ListItemButton onClick={() => handleSelectedUser(user.email)}>
                                                    <ListItemIcon>
                                                        <Person color="primary" />
                                                    </ListItemIcon>
                                                        <ListItemText primary={`${user.email}`} />
                                                </ListItemButton>
                                            </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                        <Box sx={{ width: "50%", marginInline: '20px'}}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="User Credentials"/>
                                <Tab label="User Accesses"/>
                                </Tabs>
                            </Box>
                            <TabPanel value={tabValue} index={0}>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{marginInline: '20px', width:"50%"}}>
                                {/* <Typography>User Credentials</Typography> */}
                                    <Box display='flex' alignItems='center'>
                                        {/* <FormLabel id="demo-radio-buttons-group-label">User ID: </FormLabel> */}
                                        <TextField margin="normal"  fullWidth 
                                            id="userId" 
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                            label="User ID" 
                                            value={selectedUserCredential.uid}
                                            />
                                    </Box>
                                    <Box display='flex' alignItems='center'>
                                        {/* <FormLabel id="demo-radio-buttons-group-label">Email: </FormLabel> */}
                                        <TextField margin="normal"  fullWidth 
                                            id="email" 
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                            label="Email" 
                                            value={selectedUserCredential.email}
                                            />
                                    </Box>
                                    <TextField margin="normal" required fullWidth 
                                        id="displayName" label="Profile Name" 
                                        onChange={(e) => dispatchSelectedUserCredential({ type : 'displayName', payload : e.target.value })}
                                        value={selectedUserCredential.displayName}
                                        />
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Email Verified</FormLabel>
                                        <RadioGroup row name="row-radio-buttons-group" defaultValue="false"
                                            onChange={(e) => dispatchSelectedUserCredential({ type : 'emailVerify', payload : e.target.value === 'true' ? true : false})}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Verified" />
                                            <FormControlLabel value="false" control={<Radio />} label="Not Verified" />
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField margin="normal" required fullWidth
                                        id="phone-number" label="Phone Number" 
                                        onChange={(e) => dispatchSelectedUserCredential({ type : 'phoneNumber', payload : e.target.value })}
                                        value={selectedUserCredential.phoneNumber}
                                        />
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Account Status</FormLabel>
                                        <RadioGroup row name="controlled-radio-buttons-group" value={selectedUserCredential.disabled}
                                            onChange={(e) => dispatchSelectedUserCredential({ type : 'disabled', payload : e.target.value})}>
                                            <FormControlLabel value={false} control={<Radio />} label="Enabled" />
                                            <FormControlLabel value={true} control={<Radio />} label="Disabled" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Box sx={{ width: '100%', display : 'flex', justifyContent: 'center'}}>
                                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, }}>Update User</Button>
                                    </Box>
                                    {/* {error && <div className="error">{error}</div>} */}
                                </Box>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <Typography>User Email : {selectedUserCredential.email}</Typography>
                                <Button variant="outlined">Select All</Button>
                                <Button variant="outlined">Unselect All</Button>
                                
                                <br />
                                <Box sx={{backgroundColor: '#FFF0F0', padding : '20px', overflow:'auto', height: '50vh'}}>
                                    <FormControl>

                                    <FormLabel id="user-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>User Control</FormLabel>
                                        <FormControlLabel inputRef={createUser}  label="Create User" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={modifyUser}  label="Modify User" control={<Checkbox  />}/>

                                    <FormLabel id="part-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Part/SFG Control</FormLabel>
                                        <FormControlLabel inputRef={createPart}  label="Create Part" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={modifyPart}  label="Modify Part" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={createSFG}  label="Create SFG" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={modifySFG}  label="Modify SFG" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={create3rdPartySFG}  label="Create 3rd Party SFG" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={modify3rdPartySFG}  label="Modify 3rd Party SFG" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={addUnit}  label="Add Unit" control={<Checkbox  />}/>

                                    <FormLabel id="lc-process" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>LC Process</FormLabel>
                                        <FormControlLabel inputRef={lcEntry}  label="LC Entry" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={lcEdit}  label="LC Edit" control={<Checkbox  />}/>

                                    <FormLabel id="store-rm-receive" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Store RM Receive</FormLabel>
                                        <FormControlLabel inputRef={storeRmRecvEntry}  label="Store RM RCV Entry" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={storeRmRecvEdit}  label="Store RM RCV Edit" control={<Checkbox  />}/>

                                    <FormLabel id="warehouse-setup" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Warehouse Setup</FormLabel>
                                        <FormControlLabel inputRef={warehouseCreate}  label="Warehouse Create" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={warehouseModify}  label="Warehouse Modify" control={<Checkbox  />}/>
                                    
                                    {/* //? SR is for requisition, i.e., requesting to get something */}
                                    <FormLabel id="sr-issue" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>SR ISSUE</FormLabel>
                                        <FormControlLabel inputRef={srFromOtherThanProdAndQC}  label="SR From Other Than Production and QC" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromQC}  label="SR From QC" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromThermoforming}  label="SR From Thermoforming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromDoorFoaming}  label="SR From Door Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromPowerPress}  label="SR From Power Press" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromRollForming}  label="SR From Roll Forming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromEvaWrap}  label="SR From Eva Wrap" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromPreAssembly}  label="SR From Pre Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromBodyFoaming}  label="SR From Body Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromPostAssembly}  label="SR From Post Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromFinishingLine}  label="SR From Finishing Line" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromUShell}  label="SR From U Shell" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromHeaters}  label="SR From Heaters" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromPadPrint}  label="SR From Pad Print" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromHotStamp}  label="SR From Hot Stamp" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromClinching}  label="SR From Clinching" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={srFromServiceInternal}  label="SR From Service (Internal)" control={<Checkbox  />}/>
                                        
                                    <FormLabel id="delivery" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Delivery Against SR</FormLabel>
                                        <FormControlLabel inputRef={deliveryFromFirstShed}  label="Delivery From 'First Shed' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromThirdShed}  label="Delivery From 'Third Shed' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromForthShed}  label="Delivery From 'Forth Shed' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromFGShed}  label="Delivery From 'FG Shed' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromOutsideShed}  label="Delivery From 'Outside Shed' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromSMCPremises}  label="Delivery From 'SMC Premises' warehouse" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromQC}  label="Delivery From QC" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromThermoforming}  label="Delivery From Thermoforming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromDoorFoaming}  label="Delivery From Door Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromPowerPress}  label="Delivery From Power Press" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromRollForming}  label="Delivery From Roll Forming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromEvaWrap}  label="Delivery From Eva Wrap" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromPreAssembly}  label="Delivery From Pre Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromBodyFoaming}  label="Delivery From Body Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromPostAssembly}  label="Delivery From Post Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromFinishingLine}  label="Delivery From Finishing Line" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromUShell}  label="Delivery From U Shell" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromHeaters}  label="Delivery From Heaters" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromPadPrint}  label="Delivery From Pad Print" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromHotStamp}  label="Delivery From Hot Stamp" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromClinching}  label="Delivery From Clinching" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={deliveryFromServiceInternal}  label="Delivery From Service (Internal)" control={<Checkbox  />}/>
                                    
                                    {/* //? receive from store, or from a Push request */}
                                    <FormLabel id="rm-rcv-no-store" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>RM Recv - other than store</FormLabel>
                                        <FormControlLabel inputRef={rmRcvOtherThanProdAndQC}  label="RM Rcv Other Than Production and QC" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvQC}  label="RM Rcv QC" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvThermoforming}  label="RM Rcv Thermoforming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvDoorFoaming}  label="RM Rcv Door Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvPowerPress}  label="RM Rcv Power Press" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvRollForming}  label="RM Rcv Roll Forming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvEvaWrap}  label="RM Rcv Eva Wrap" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvPreAssembly}  label="RM Rcv Pre Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvBodyFoaming}  label="RM Rcv Body Foaming" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvPostAssembly}  label="RM Rcv Post Assembly" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvFinishingLine}  label="RM Rcv Finishing Line" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvUShell}  label="RM Rcv U Shell" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvHeaters}  label="RM Rcv Heaters" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvPadPrint}  label="RM Rcv Pad Print" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvHotStamp}  label="RM Rcv Hot Stamp" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={rmRcvClinching}  label="RM Rcv Clinching" control={<Checkbox  />}/>
                                    
                                    {/* //? if any section/department (request to) send anything to any other section/department */}
                                    <FormLabel id="rm-rcv-no-store" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>RM/Part Push</FormLabel>
                                        <FormControlLabel inputRef={rmPush}  label="RM Push" control={<Checkbox  />}/>
                                    
                                    <FormLabel id="production-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Production Control</FormLabel>
                                        <Grid container >
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control1">FG Production Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={fgProdEntry}  label="FG Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={fgProdEdit}  label="FG Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control2">Gas Charging Production Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={gasChargingProdEntry}  label="GC Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={gasChargingProdEdit}  label="GC Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control3">Door Fitting Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={postDoorFittingProdEntry}  label="Post Door Fitting Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={postDoorFittingProdEdit}  label="Post Door Fitting Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control4">Body Foaming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={bodyFoamingProdEntry}  label="Body Foam Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={bodyFoamingProdEdit}  label="Body Foam Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control5">Pre Assmb Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={preAssemblyProdEntry}  label="Pre Assmb Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={preAssemblyProdEdit}  label="Pre Assmb Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control6">Evaporator Wrapping</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={evaWrapProdEntry}  label="Eva Wrap Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={evaWrapProdEdit}  label="Eva Wrap Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control7">Thermoforming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={thermoformingProdEntry}  label="Thermo Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={thermoformingProdEdit}  label="Thermo Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control8">Door Foaming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={doorFoamingProdEntry} label="Door Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={doorFoamingProdEdit} label="Door Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control9">Power Press Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={powerPressProdEntry} label="Power Press Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={powerPressProdEdit} label="Power Press Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control10">Side Sheet Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={sideSheetProdEntry} label="Side Sheet Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={sideSheetProdEdit} label="Side Sheet Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control11">U Shell Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={uShellProdEntry} label="U Shell Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={uShellProdEdit} label="U Shell Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control12">Heater Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={heaterProdEntry} label="Heater Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={heaterProdEdit} label="Heater Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control13">Clinching Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={clinchingProdEntry} label="Clinching Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={clinchingProdEdit} label="Clinching Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control14">Pad Print Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={padPrintProdEntry} label="Pad Print Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={padPrintProdEdit} label="Pad Print Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control15">Hot Stamp Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={hotStampProdEntry} label="Hot Stamp Prod Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={hotStampProdEdit} label="Hot Stamp Prod Edit" control={<Checkbox  />}/>
                                            </Grid>
                                        </Grid>
                                    
                                    <FormLabel id="quality-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Quality Control</FormLabel>
                                        <Grid container>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control1">IQC</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={iqcEntry} label="IQC Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={iqcEdit} label="IQC Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control2">OSD</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={osdEntry} label="OSD Entry" control={<Checkbox  />}/>
                                                <FormControlLabel inputRef={osdEdit} label="OSD Edit" control={<Checkbox  />}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control3">SR Singer service</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel inputRef={SSCSR} label="SR Singer Service" control={<Checkbox  />}/>
                                            </Grid>
                                            
                                        </Grid>
                                    <FormLabel id="disposal" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Disposal</FormLabel>
                                        <FormControlLabel inputRef={disposalRequest} label="Disposal Request" control={<Checkbox  />}/>
                                        <FormControlLabel inputRef={disposalApproval} label="Disposal Approval" control={<Checkbox />}/>
                                    </FormControl>
                                </Box>
                                <Button variant="contained" sx={{ mt: 3, mb: 2, }} onClick={()=>handleAccessRecordSave()}>Approval</Button>
                            </TabPanel>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default UpdateUser;
