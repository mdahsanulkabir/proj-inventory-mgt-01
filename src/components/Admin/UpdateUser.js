// ? Admin can create a new user with this form
// ? email should be fixed, user can change the displayName
// ? initially the password will be set as - Singer@!123. User must changer his/her password while 
// ? first log in
// ? User must verify his/her email. (Admin can by pass the verification in Update user form)
// ? Until verification, the account will be disabled and cannot access any route

import { ManageAccounts, Person } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useReducer } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../firebase.init';
import PropTypes from 'prop-types';
import { TokenContext } from '../../App';


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


const userAccessControlInitialState = {
    admin: false,
    createUser: false,
    modifyUser: false,
    createSupplier: false,
    modifySupplier: false,
    createPart: false,
    modifyPart: false,
    createSFG: false,
    modifySFG: false,
    create3rdPartySFG: false,
    modify3rdPartySFG: false,
    addUnit: false,
    lcEntry: false,
    lcEdit: false,
    storeRmRecvEntry: false,
    storeRmRecvEdit: false,
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
const reducerUserAccessControl = ( state, action ) => {    // TODO i think there might be a good way to handle this reducer function
    switch ( action.type ) {
        case 'Initialize_userAccessControl' :   return action.payload;
        case 'admin' :                          return { ...state, admin : action.payload}
        case 'createUser' :                     return { ...state, createUser : action.payload}
        case 'modifyUser' :                     return { ...state, modifyUser : action.payload}
        case 'createSupplier' :                     return { ...state, createSupplier : action.payload}
        case 'modifySupplier' :                     return { ...state, modifySupplier : action.payload}
        case 'createPart' :                     return { ...state, createPart : action.payload}
        case 'modifyPart' :                     return { ...state, modifyPart : action.payload}
        case 'createSFG' :                      return { ...state, createSFG : action.payload}
        case 'modifySFG' :                      return { ...state, modifySFG : action.payload}
        case 'create3rdPartySFG' :              return { ...state, create3rdPartySFG : action.payload}
        case 'modify3rdPartySFG' :              return { ...state, modify3rdPartySFG : action.payload}
        case 'addUnit' :                        return { ...state, addUnit : action.payload}
        case 'lcEntry' :                        return { ...state, lcEntry : action.payload}
        case 'lcEdit' :                         return { ...state, lcEdit : action.payload}
        case 'storeRmRecvEntry' :               return { ...state, storeRmRecvEntry : action.payload}
        case 'storeRmRecvEdit' :                return { ...state, storeRmRecvEdit : action.payload}
        case 'warehouseCreate' :                return { ...state, warehouseCreate : action.payload}
        case 'warehouseModify' :                return { ...state, warehouseModify : action.payload}
        case 'srFromOtherThanProdAndQC' :       return { ...state, srFromOtherThanProdAndQC : action.payload}
        case 'srFromQC' :                       return { ...state, srFromQC : action.payload}
        case 'srFromThermoforming' :            return { ...state, srFromThermoforming : action.payload}
        case 'srFromDoorFoaming' :              return { ...state, srFromDoorFoaming : action.payload}
        case 'srFromPowerPress' :               return { ...state, srFromPowerPress : action.payload}
        case 'srFromRollForming' :              return { ...state, srFromRollForming : action.payload}
        case 'srFromEvaWrap' :                  return { ...state, srFromEvaWrap : action.payload}
        case 'srFromPreAssembly' :              return { ...state, srFromPreAssembly : action.payload}
        case 'srFromBodyFoaming' :              return { ...state, srFromBodyFoaming : action.payload}
        case 'srFromPostAssembly' :             return { ...state, srFromPostAssembly : action.payload}
        case 'srFromFinishingLine' :            return { ...state, srFromFinishingLine : action.payload}
        case 'srFromUShell' :                   return { ...state, srFromUShell : action.payload}
        case 'srFromHeaters' :                  return { ...state, srFromHeaters : action.payload}
        case 'srFromPadPrint' :                 return { ...state, srFromPadPrint : action.payload}
        case 'srFromHotStamp' :                 return { ...state, srFromHotStamp : action.payload}
        case 'srFromClinching' :                return { ...state, srFromClinching : action.payload}
        case 'srFromServiceInternal' :          return { ...state, srFromServiceInternal : action.payload}
        case 'deliveryFromFirstShed' :          return { ...state, deliveryFromFirstShed : action.payload}
        case 'deliveryFromThirdShed' :          return { ...state, deliveryFromThirdShed : action.payload}
        case 'deliveryFromForthShed' :          return { ...state, deliveryFromForthShed : action.payload}
        case 'deliveryFromFGShed' :             return { ...state, deliveryFromFGShed : action.payload}
        case 'deliveryFromOutsideShed' :        return { ...state, deliveryFromOutsideShed : action.payload}
        case 'deliveryFromSMCPremises' :        return { ...state, deliveryFromSMCPremises : action.payload}
        case 'deliveryFromQC' :                 return { ...state, deliveryFromQC : action.payload}
        case 'deliveryFromThermoforming' :      return { ...state, deliveryFromThermoforming : action.payload}
        case 'deliveryFromDoorFoaming' :        return { ...state, deliveryFromDoorFoaming : action.payload}
        case 'deliveryFromPowerPress' :         return { ...state, deliveryFromPowerPress : action.payload}
        case 'deliveryFromRollForming' :        return { ...state, deliveryFromRollForming : action.payload}
        case 'deliveryFromEvaWrap' :            return { ...state, deliveryFromEvaWrap : action.payload}
        case 'deliveryFromPreAssembly' :        return { ...state, deliveryFromPreAssembly : action.payload}
        case 'deliveryFromBodyFoaming' :        return { ...state, deliveryFromBodyFoaming : action.payload}
        case 'deliveryFromPostAssembly' :       return { ...state, deliveryFromPostAssembly : action.payload}
        case 'deliveryFromFinishingLine' :      return { ...state, deliveryFromFinishingLine : action.payload}
        case 'deliveryFromUShell' :             return { ...state, deliveryFromUShell : action.payload}
        case 'deliveryFromHeaters' :            return { ...state, deliveryFromHeaters : action.payload}
        case 'deliveryFromPadPrint' :           return { ...state, deliveryFromPadPrint : action.payload}
        case 'deliveryFromHotStamp' :           return { ...state, deliveryFromHotStamp : action.payload}
        case 'deliveryFromClinching' :          return { ...state, deliveryFromClinching : action.payload}
        case 'deliveryFromServiceInternal' :    return { ...state, deliveryFromServiceInternal : action.payload}
        case 'rmRcvOtherThanProdAndQC' :        return { ...state, rmRcvOtherThanProdAndQC : action.payload}
        case 'rmRcvQC' :                        return { ...state, rmRcvQC : action.payload}
        case 'rmRcvThermoforming' :             return { ...state, rmRcvThermoforming : action.payload}
        case 'rmRcvDoorFoaming' :               return { ...state, rmRcvDoorFoaming : action.payload}
        case 'rmRcvPowerPress' :                return { ...state, rmRcvPowerPress : action.payload}
        case 'rmRcvRollForming' :               return { ...state, rmRcvRollForming : action.payload}
        case 'rmRcvEvaWrap' :                   return { ...state, rmRcvEvaWrap : action.payload}
        case 'rmRcvPreAssembly' :               return { ...state, rmRcvPreAssembly : action.payload}
        case 'rmRcvBodyFoaming' :               return { ...state, rmRcvBodyFoaming : action.payload}
        case 'rmRcvPostAssembly' :              return { ...state, rmRcvPostAssembly : action.payload}
        case 'rmRcvFinishingLine' :             return { ...state, rmRcvFinishingLine : action.payload}
        case 'rmRcvUShell' :                    return { ...state, rmRcvUShell : action.payload}
        case 'rmRcvHeaters' :                   return { ...state, rmRcvHeaters : action.payload}
        case 'rmRcvPadPrint' :                  return { ...state, rmRcvPadPrint : action.payload}
        case 'rmRcvHotStamp' :                  return { ...state, rmRcvHotStamp : action.payload}
        case 'rmRcvClinching' :                 return { ...state, rmRcvClinching : action.payload}
        case 'rmPush' :                         return { ...state, rmPush : action.payload}
        case 'fgProdEntry' :                    return { ...state, fgProdEntry : action.payload}
        case 'fgProdEdit' :                     return { ...state, fgProdEdit : action.payload}
        case 'gasChargingProdEntry' :           return { ...state, gasChargingProdEntry : action.payload}
        case 'gasChargingProdEdit' :            return { ...state, gasChargingProdEdit : action.payload}
        case 'postDoorFittingProdEntry' :       return { ...state, postDoorFittingProdEntry : action.payload}
        case 'postDoorFittingProdEdit' :        return { ...state, postDoorFittingProdEdit : action.payload}
        case 'bodyFoamingProdEntry' :           return { ...state, bodyFoamingProdEntry : action.payload}
        case 'bodyFoamingProdEdit' :            return { ...state, bodyFoamingProdEdit : action.payload}
        case 'preAssemblyProdEntry' :           return { ...state, preAssemblyProdEntry : action.payload}
        case 'preAssemblyProdEdit' :            return { ...state, preAssemblyProdEdit : action.payload}
        case 'evaWrapProdEntry' :               return { ...state, evaWrapProdEntry : action.payload}
        case 'evaWrapProdEdit' :                return { ...state, evaWrapProdEdit : action.payload}
        case 'thermoformingProdEntry' :         return { ...state, thermoformingProdEntry : action.payload}
        case 'thermoformingProdEdit' :          return { ...state, thermoformingProdEdit : action.payload}
        case 'doorFoamingProdEntry' :           return { ...state, doorFoamingProdEntry : action.payload}
        case 'doorFoamingProdEdit' :            return { ...state, doorFoamingProdEdit : action.payload}
        case 'powerPressProdEntry' :            return { ...state, powerPressProdEntry : action.payload}
        case 'powerPressProdEdit' :             return { ...state, powerPressProdEdit : action.payload}
        case 'sideSheetProdEntry' :             return { ...state, sideSheetProdEntry : action.payload}
        case 'sideSheetProdEdit' :              return { ...state, sideSheetProdEdit : action.payload}
        case 'uShellProdEntry' :                return { ...state, uShellProdEntry : action.payload}
        case 'uShellProdEdit' :                 return { ...state, uShellProdEdit : action.payload}
        case 'heaterProdEntry' :                return { ...state, heaterProdEntry : action.payload}
        case 'heaterProdEdit' :                 return { ...state, heaterProdEdit : action.payload}
        case 'clinchingProdEntry' :             return { ...state, clinchingProdEntry : action.payload}
        case 'clinchingProdEdit' :              return { ...state, clinchingProdEdit : action.payload}
        case 'padPrintProdEntry' :              return { ...state, padPrintProdEntry : action.payload}
        case 'padPrintProdEdit' :               return { ...state, padPrintProdEdit : action.payload}
        case 'hotStampProdEntry' :              return { ...state, hotStampProdEntry : action.payload}
        case 'hotStampProdEdit' :               return { ...state, hotStampProdEdit : action.payload}
        case 'iqcEntry' :                       return { ...state, iqcEntry : action.payload}
        case 'iqcEdit' :                        return { ...state, iqcEdit : action.payload}
        case 'osdEntry' :                       return { ...state, osdEntry : action.payload}
        case 'osdEdit' :                        return { ...state, osdEdit : action.payload}
        case 'SSCSR' :                          return { ...state, SSCSR : action.payload}
        case 'disposalRequest' :                return { ...state, disposalRequest : action.payload}
        case 'disposalApproval' :               return { ...state, disposalApproval : action.payload}
        default:                                throw new Error(`Unknown action type: ${action.type}`);

    }
}




const UpdateUser = () => {
    
    const [ allUserCredentialsState, dispatchAllUserCredentials ] = useReducer ( reducerAllUserCredentials, allUserInitialState );
    const [ selectedUserCredential, dispatchSelectedUserCredential ] = useReducer ( reducerSelectedUser , selectedUserInitialState );
    const [ userAccessControlState, dispatchUserAccessControl ] = useReducer ( reducerUserAccessControl, userAccessControlInitialState );
    

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    //? test use context
    const token = useContext(TokenContext);
    console.log("token =  > " , token);
    // const textContextValue = () => {
    //     console.log(token);   ///  <================== test use context
    // }


    // TODO Move the token to global level and use useContext 
    // const [ token, setToken ] = useState('');
    // const [user] = useAuthState(auth);
    // console.log(user);     // <--------------------------------
    // useEffect(()=> {
    //     if(user){
    //         user.getIdToken(true)
    //         .then(res => setToken(res))
    //         .catch(error => console.log(error))
    //     }
    //     },[user])
    

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
    },[]) 

    
    
    allUserCredentialsState && console.log(allUserCredentialsState);

    const handleSelectedUser = async (email) => {
        const selectedUser = allUserCredentialsState.find(getuser => getuser.email === email);
        dispatchSelectedUserCredential({
            type: 'Initialise_selectedUser',
            payload: selectedUser
        })
        dispatchUserAccessControl({
            type : 'Initialize_userAccessControl',
            payload : userAccessControlInitialState
        })
        // console.log(selectedUser);

        // console.log(email);
        const response = await fetch(`http://localhost:5000/api/getUserAccessControl/${email}`,{
            method : 'GET',
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + token,
            },
        })
        const data = await response.json();
        if(response.ok) {
            console.log(data.access);
            data.access.map(item => 
                dispatchUserAccessControl({
                    type : item,
                    payload : true
                })
            )
        }
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

    const handleToggleUserAccess = (userAccess, event) => {
        console.log(userAccess, event.target.checked);
        dispatchUserAccessControl({
            type : userAccess,
            payload: event.target.checked
        })
    }

    const handleAccessRecordSave = async () => {
        let access = [];
        userAccessControlState?.admin && access.push("admin");;
        userAccessControlState?.createUser && access.push("createUser");
        userAccessControlState?.modifyUser && access.push("modifyUser");
        userAccessControlState?.createSupplier && access.push("createSupplier");
        userAccessControlState?.modifySupplier && access.push("modifySupplier");
        userAccessControlState?.createPart && access.push("createPart");
        userAccessControlState?.modifyPart && access.push("modifyPart");
        userAccessControlState?.createSFG && access.push("createSFG");
        userAccessControlState?.modifySFG && access.push("modifySFG");
        userAccessControlState?.create3rdPartySFG && access.push("create3rdPartySFG");
        userAccessControlState?.modify3rdPartySFG && access.push("modify3rdPartySFG");
        userAccessControlState?.addUnit && access.push("addUnit");
        userAccessControlState?.lcEntry && access.push("lcEntry");
        userAccessControlState?.lcEdit && access.push("lcEdit");
        userAccessControlState?.storeRmRecvEntry && access.push("storeRmRecvEntry");
        userAccessControlState?.storeRmRecvEdit && access.push("storeRmRecvEdit");
        userAccessControlState?.warehouseCreate && access.push("warehouseCreate");
        userAccessControlState?.warehouseModify && access.push("warehouseModify");
        userAccessControlState?.srFromOtherThanProdAndQC && access.push("srFromOtherThanProdAndQC");
        userAccessControlState?.srFromQC && access.push("srFromQC");
        userAccessControlState?.srFromThermoforming && access.push("srFromThermoforming");
        userAccessControlState?.srFromDoorFoaming && access.push("srFromDoorFoaming");
        userAccessControlState?.srFromPowerPress && access.push("srFromPowerPress");
        userAccessControlState?.srFromRollForming && access.push("srFromRollForming");
        userAccessControlState?.srFromEvaWrap && access.push("srFromEvaWrap");
        userAccessControlState?.srFromPreAssembly && access.push("srFromPreAssembly");
        userAccessControlState?.srFromBodyFoaming && access.push("srFromBodyFoaming");
        userAccessControlState?.srFromPostAssembly && access.push("srFromPostAssembly");
        userAccessControlState?.srFromFinishingLine && access.push("srFromFinishingLine");
        userAccessControlState?.srFromUShell && access.push("srFromUShell");
        userAccessControlState?.srFromHeaters && access.push("srFromHeaters");
        userAccessControlState?.srFromPadPrint && access.push("srFromPadPrint");
        userAccessControlState?.srFromHotStamp && access.push("srFromHotStamp");
        userAccessControlState?.srFromClinching && access.push("srFromClinching");
        userAccessControlState?.srFromServiceInternal && access.push("srFromServiceInternal");
        userAccessControlState?.deliveryFromFirstShed && access.push("deliveryFromFirstShed");
        userAccessControlState?.deliveryFromThirdShed && access.push("deliveryFromThirdShed");
        userAccessControlState?.deliveryFromForthShed && access.push("deliveryFromForthShed");
        userAccessControlState?.deliveryFromFGShed && access.push("deliveryFromFGShed");
        userAccessControlState?.deliveryFromOutsideShed && access.push("deliveryFromOutsideShed");
        userAccessControlState?.deliveryFromSMCPremises && access.push("deliveryFromSMCPremises");
        userAccessControlState?.deliveryFromQC && access.push("deliveryFromQC");
        userAccessControlState?.deliveryFromThermoforming && access.push("deliveryFromThermoforming");
        userAccessControlState?.deliveryFromDoorFoaming && access.push("deliveryFromDoorFoaming");
        userAccessControlState?.deliveryFromPowerPress && access.push("deliveryFromPowerPress");
        userAccessControlState?.deliveryFromRollForming && access.push("deliveryFromRollForming");
        userAccessControlState?.deliveryFromEvaWrap && access.push("deliveryFromEvaWrap");
        userAccessControlState?.deliveryFromPreAssembly && access.push("deliveryFromPreAssembly");
        userAccessControlState?.deliveryFromBodyFoaming && access.push("deliveryFromBodyFoaming");
        userAccessControlState?.deliveryFromPostAssembly && access.push("deliveryFromPostAssembly");
        userAccessControlState?.deliveryFromFinishingLine && access.push("deliveryFromFinishingLine");
        userAccessControlState?.deliveryFromUShell && access.push("deliveryFromUShell");
        userAccessControlState?.deliveryFromHeaters && access.push("deliveryFromHeaters");
        userAccessControlState?.deliveryFromPadPrint && access.push("deliveryFromPadPrint");
        userAccessControlState?.deliveryFromHotStamp && access.push("deliveryFromHotStamp");
        userAccessControlState?.deliveryFromClinching && access.push("deliveryFromClinching");
        userAccessControlState?.deliveryFromServiceInternal && access.push("deliveryFromServiceInternal");
        userAccessControlState?.rmRcvOtherThanProdAndQC && access.push("rmRcvOtherThanProdAndQC");
        userAccessControlState?.rmRcvQC && access.push("rmRcvQC");
        userAccessControlState?.rmRcvThermoforming && access.push("rmRcvThermoforming");
        userAccessControlState?.rmRcvDoorFoaming && access.push("rmRcvDoorFoaming");
        userAccessControlState?.rmRcvPowerPress && access.push("rmRcvPowerPress");
        userAccessControlState?.rmRcvRollForming && access.push("rmRcvRollForming");
        userAccessControlState?.rmRcvEvaWrap && access.push("rmRcvEvaWrap");
        userAccessControlState?.rmRcvPreAssembly && access.push("rmRcvPreAssembly");
        userAccessControlState?.rmRcvBodyFoaming && access.push("rmRcvBodyFoaming");
        userAccessControlState?.rmRcvPostAssembly && access.push("rmRcvPostAssembly");
        userAccessControlState?.rmRcvFinishingLine && access.push("rmRcvFinishingLine");
        userAccessControlState?.rmRcvUShell && access.push("rmRcvUShell");
        userAccessControlState?.rmRcvHeaters && access.push("rmRcvHeaters");
        userAccessControlState?.rmRcvPadPrint && access.push("rmRcvPadPrint");
        userAccessControlState?.rmRcvHotStamp && access.push("rmRcvHotStamp");
        userAccessControlState?.rmRcvClinching && access.push("rmRcvClinching");
        userAccessControlState?.rmPush && access.push("rmPush");
        userAccessControlState?.fgProdEntry && access.push("fgProdEntry");
        userAccessControlState?.fgProdEdit && access.push("fgProdEdit");
        userAccessControlState?.gasChargingProdEntry && access.push("gasChargingProdEntry");
        userAccessControlState?.gasChargingProdEdit && access.push("gasChargingProdEdit");
        userAccessControlState?.postDoorFittingProdEntry && access.push("postDoorFittingProdEntry");
        userAccessControlState?.postDoorFittingProdEdit && access.push("postDoorFittingProdEdit");
        userAccessControlState?.bodyFoamingProdEntry && access.push("bodyFoamingProdEntry");
        userAccessControlState?.bodyFoamingProdEdit && access.push("bodyFoamingProdEdit");
        userAccessControlState?.preAssemblyProdEntry && access.push("preAssemblyProdEntry");
        userAccessControlState?.preAssemblyProdEdit && access.push("preAssemblyProdEdit");
        userAccessControlState?.evaWrapProdEntry && access.push("evaWrapProdEntry");
        userAccessControlState?.evaWrapProdEdit && access.push("evaWrapProdEdit");
        userAccessControlState?.thermoformingProdEntry && access.push("thermoformingProdEntry");
        userAccessControlState?.thermoformingProdEdit && access.push("thermoformingProdEdit");
        userAccessControlState?.doorFoamingProdEntry && access.push("doorFoamingProdEntry");
        userAccessControlState?.doorFoamingProdEdit && access.push("doorFoamingProdEdit");
        userAccessControlState?.powerPressProdEntry && access.push("powerPressProdEntry");
        userAccessControlState?.powerPressProdEdit && access.push("powerPressProdEdit");
        userAccessControlState?.sideSheetProdEntry && access.push("sideSheetProdEntry");
        userAccessControlState?.sideSheetProdEdit && access.push("sideSheetProdEdit");
        userAccessControlState?.uShellProdEntry && access.push("uShellProdEntry");
        userAccessControlState?.uShellProdEdit && access.push("uShellProdEdit");
        userAccessControlState?.heaterProdEntry && access.push("heaterProdEntry");
        userAccessControlState?.heaterProdEdit && access.push("heaterProdEdit");
        userAccessControlState?.clinchingProdEntry && access.push("clinchingProdEntry");
        userAccessControlState?.clinchingProdEdit && access.push("clinchingProdEdit");
        userAccessControlState?.padPrintProdEntry && access.push("padPrintProdEntry");
        userAccessControlState?.padPrintProdEdit && access.push("padPrintProdEdit");
        userAccessControlState?.hotStampProdEntry && access.push("hotStampProdEntry");
        userAccessControlState?.hotStampProdEdit && access.push("hotStampProdEdit");
        userAccessControlState?.iqcEntry && access.push("iqcEntry");
        userAccessControlState?.iqcEdit && access.push("iqcEdit");
        userAccessControlState?.osdEntry && access.push("osdEntry");
        userAccessControlState?.osdEdit && access.push("osdEdit");
        userAccessControlState?.SSCSR && access.push("SSCSR");
        userAccessControlState?.disposalRequest && access.push("disposalRequest");
        userAccessControlState?.disposalApproval && access.push("disposalApproval");

        const sendAccessData = { email: selectedUserCredential.email, access}

        const response = await fetch(`http://localhost:5000/api/update-user-access`, {
            method: "PATCH",
            body: JSON.stringify(sendAccessData),
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await response.json();

        //? after getting the result, the access array is cleared
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
                                        <FormControlLabel label="Create User" control={<Checkbox checked={userAccessControlState.createUser}  
                                            onChange={(event)=> handleToggleUserAccess("createUser", event)}/>}/>
                                        <FormControlLabel label="Modify User" control={<Checkbox checked={userAccessControlState.modifyUser}  
                                            onChange={(event)=> handleToggleUserAccess("modifyUser", event)}/>}/>
                                        <FormControlLabel label="Create Supplier" control={<Checkbox checked={userAccessControlState.createSupplier}  
                                            onChange={(event)=> handleToggleUserAccess("createSupplier", event)}/>}/>
                                        <FormControlLabel label="Modify Supplier" control={<Checkbox checked={userAccessControlState.modifySupplier}  
                                            onChange={(event)=> handleToggleUserAccess("modifySupplier", event)}/>}/>

                                    <FormLabel id="part-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Part/SFG Control</FormLabel>
                                        <FormControlLabel label="Create Part" control={<Checkbox checked={userAccessControlState.createPart}  
                                            onChange={(event)=> handleToggleUserAccess("createPart", event)}/>}/>
                                        <FormControlLabel label="Modify Part" control={<Checkbox checked={userAccessControlState.modifyPart}  
                                            onChange={(event)=> handleToggleUserAccess("modifyPart", event)}/>}/>
                                        <FormControlLabel label="Create SFG" control={<Checkbox checked={userAccessControlState.createSFG}  
                                            onChange={(event)=> handleToggleUserAccess("createSFG", event)}/>}/>
                                        <FormControlLabel label="Modify SFG" control={<Checkbox checked={userAccessControlState.modifySFG}  
                                            onChange={(event)=> handleToggleUserAccess("modifySFG", event)}/>}/>
                                        <FormControlLabel label="Create 3rd Party SFG" control={<Checkbox checked={userAccessControlState.create3rdPartySFG}  
                                            onChange={(event)=> handleToggleUserAccess("create3rdPartySFG", event)}/>}/>
                                        <FormControlLabel label="Modify 3rd Party SFG" control={<Checkbox checked={userAccessControlState.modify3rdPartySFG}  
                                            onChange={(event)=> handleToggleUserAccess("modify3rdPartySFG", event)}/>}/>
                                        <FormControlLabel label="Add Unit" control={<Checkbox checked={userAccessControlState.addUnit}  
                                            onChange={(event)=> handleToggleUserAccess("addUnit", event)}/>}/>

                                    <FormLabel id="lc-process" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>LC Process</FormLabel>
                                        <FormControlLabel label="LC Entry" control={<Checkbox checked={userAccessControlState.lcEntry}  
                                            onChange={(event)=> handleToggleUserAccess("lcEntry", event)}/>}/>
                                        <FormControlLabel label="LC Edit" control={<Checkbox checked={userAccessControlState.lcEdit}  
                                            onChange={(event)=> handleToggleUserAccess("lcEdit", event)}/>}/>

                                    <FormLabel id="store-rm-receive" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Store RM Receive</FormLabel>
                                        <FormControlLabel label="Store RM RCV Entry" control={<Checkbox checked={userAccessControlState.storeRmRecvEntry}  
                                            onChange={(event)=> handleToggleUserAccess("storeRmRecvEntry", event)}/>}/>
                                        <FormControlLabel label="Store RM RCV Edit" control={<Checkbox checked={userAccessControlState.storeRmRecvEdit}  
                                            onChange={(event)=> handleToggleUserAccess("storeRmRecvEdit", event)}/>}/>

                                    <FormLabel id="warehouse-setup" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Warehouse Setup</FormLabel>
                                        <FormControlLabel label="Warehouse Create" control={<Checkbox checked={userAccessControlState.warehouseCreate}  
                                            onChange={(event)=> handleToggleUserAccess("warehouseCreate", event)}/>}/>
                                        <FormControlLabel label="Warehouse Modify" control={<Checkbox checked={userAccessControlState.warehouseModify}  
                                            onChange={(event)=> handleToggleUserAccess("warehouseModify", event)}/>}/>
                                    
                                    {/* //? SR is for requisition, i.e., requesting to get something */}
                                    <FormLabel id="sr-issue" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>SR ISSUE</FormLabel>
                                        <FormControlLabel label="SR From Other Than Production and QC" control={<Checkbox checked={userAccessControlState.srFromOtherThanProdAndQC}  
                                            onChange={(event)=> handleToggleUserAccess("srFromOtherThanProdAndQC", event)}/>}/>
                                        <FormControlLabel label="SR From QC" control={<Checkbox checked={userAccessControlState.srFromQC}  
                                            onChange={(event)=> handleToggleUserAccess("srFromQC", event)}/>}/>
                                        <FormControlLabel label="SR From Thermoforming" control={<Checkbox checked={userAccessControlState.srFromThermoforming}  
                                            onChange={(event)=> handleToggleUserAccess("srFromThermoforming", event)}/>}/>
                                        <FormControlLabel label="SR From Door Foaming" control={<Checkbox checked={userAccessControlState.srFromDoorFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("srFromDoorFoaming", event)}/>}/>
                                        <FormControlLabel label="SR From Power Press" control={<Checkbox checked={userAccessControlState.srFromPowerPress}  
                                            onChange={(event)=> handleToggleUserAccess("srFromPowerPress", event)}/>}/>
                                        <FormControlLabel label="SR From Roll Forming" control={<Checkbox checked={userAccessControlState.srFromRollForming}  
                                            onChange={(event)=> handleToggleUserAccess("srFromRollForming", event)}/>}/>
                                        <FormControlLabel label="SR From Eva Wrap" control={<Checkbox checked={userAccessControlState.srFromEvaWrap}  
                                            onChange={(event)=> handleToggleUserAccess("srFromEvaWrap", event)}/>}/>
                                        <FormControlLabel label="SR From Pre Assembly" control={<Checkbox checked={userAccessControlState.srFromPreAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("srFromPreAssembly", event)}/>}/>
                                        <FormControlLabel label="SR From Body Foaming" control={<Checkbox checked={userAccessControlState.srFromBodyFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("srFromBodyFoaming", event)}/>}/>
                                        <FormControlLabel label="SR From Post Assembly" control={<Checkbox checked={userAccessControlState.srFromPostAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("srFromPostAssembly", event)}/>}/>
                                        <FormControlLabel label="SR From Finishing Line" control={<Checkbox checked={userAccessControlState.srFromFinishingLine}  
                                            onChange={(event)=> handleToggleUserAccess("srFromFinishingLine", event)}/>}/>
                                        <FormControlLabel label="SR From U Shell" control={<Checkbox checked={userAccessControlState.srFromUShell}  
                                            onChange={(event)=> handleToggleUserAccess("srFromUShell", event)}/>}/>
                                        <FormControlLabel label="SR From Heaters" control={<Checkbox checked={userAccessControlState.srFromHeaters}  
                                            onChange={(event)=> handleToggleUserAccess("srFromHeaters", event)}/>}/>
                                        <FormControlLabel label="SR From Pad Print" control={<Checkbox checked={userAccessControlState.srFromPadPrint}  
                                            onChange={(event)=> handleToggleUserAccess("srFromPadPrint", event)}/>}/>
                                        <FormControlLabel label="SR From Hot Stamp" control={<Checkbox checked={userAccessControlState.srFromHotStamp}  
                                            onChange={(event)=> handleToggleUserAccess("srFromHotStamp", event)}/>}/>
                                        <FormControlLabel label="SR From Clinching" control={<Checkbox checked={userAccessControlState.srFromClinching}  
                                            onChange={(event)=> handleToggleUserAccess("srFromClinching", event)}/>}/>
                                        <FormControlLabel label="SR From Service (Internal)" control={<Checkbox checked={userAccessControlState.srFromServiceInternal}  
                                            onChange={(event)=> handleToggleUserAccess("srFromServiceInternal", event)}/>}/>
                                        
                                    <FormLabel id="delivery" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Delivery Against SR</FormLabel>
                                        <FormControlLabel label="Delivery From 'First Shed' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromFirstShed}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromFirstShed", event)}/>}/>
                                        <FormControlLabel label="Delivery From 'Third Shed' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromThirdShed}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromThirdShed", event)}/>}/>
                                        <FormControlLabel label="Delivery From 'Forth Shed' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromForthShed}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromForthShed", event)}/>}/>
                                        <FormControlLabel label="Delivery From 'FG Shed' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromFGShed}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromFGShed", event)}/>}/>
                                        <FormControlLabel label="Delivery From 'Outside Shed' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromOutsideShed}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromOutsideShed", event)}/>}/>
                                        <FormControlLabel label="Delivery From 'SMC Premises' warehouse" control={<Checkbox checked={userAccessControlState.deliveryFromSMCPremises}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromSMCPremises", event)}/>}/>
                                        <FormControlLabel label="Delivery From QC" control={<Checkbox checked={userAccessControlState.deliveryFromQC}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromQC", event)}/>}/>
                                        <FormControlLabel label="Delivery From Thermoforming" control={<Checkbox checked={userAccessControlState.deliveryFromThermoforming}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromThermoforming", event)}/>}/>
                                        <FormControlLabel label="Delivery From Door Foaming" control={<Checkbox checked={userAccessControlState.deliveryFromDoorFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromDoorFoaming", event)}/>}/>
                                        <FormControlLabel label="Delivery From Power Press" control={<Checkbox checked={userAccessControlState.deliveryFromPowerPress}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromPowerPress", event)}/>}/>
                                        <FormControlLabel label="Delivery From Roll Forming" control={<Checkbox checked={userAccessControlState.deliveryFromRollForming}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromRollForming", event)}/>}/>
                                        <FormControlLabel label="Delivery From Eva Wrap" control={<Checkbox checked={userAccessControlState.deliveryFromEvaWrap}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromEvaWrap", event)}/>}/>
                                        <FormControlLabel label="Delivery From Pre Assembly" control={<Checkbox checked={userAccessControlState.deliveryFromPreAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromPreAssembly", event)}/>}/>
                                        <FormControlLabel label="Delivery From Body Foaming" control={<Checkbox checked={userAccessControlState.deliveryFromBodyFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromBodyFoaming", event)}/>}/>
                                        <FormControlLabel label="Delivery From Post Assembly" control={<Checkbox checked={userAccessControlState.deliveryFromPostAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromPostAssembly", event)}/>}/>
                                        <FormControlLabel label="Delivery From Finishing Line" control={<Checkbox checked={userAccessControlState.deliveryFromFinishingLine}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromFinishingLine", event)}/>}/>
                                        <FormControlLabel label="Delivery From U Shell" control={<Checkbox checked={userAccessControlState.deliveryFromUShell}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromUShell", event)}/>}/>
                                        <FormControlLabel label="Delivery From Heaters" control={<Checkbox checked={userAccessControlState.deliveryFromHeaters}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromHeaters", event)}/>}/>
                                        <FormControlLabel label="Delivery From Pad Print" control={<Checkbox checked={userAccessControlState.deliveryFromPadPrint}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromPadPrint", event)}/>}/>
                                        <FormControlLabel label="Delivery From Hot Stamp" control={<Checkbox checked={userAccessControlState.deliveryFromHotStamp}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromHotStamp", event)}/>}/>
                                        <FormControlLabel label="Delivery From Clinching" control={<Checkbox checked={userAccessControlState.deliveryFromClinching}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromClinching", event)}/>}/>
                                        <FormControlLabel label="Delivery From Service (Internal)" control={<Checkbox checked={userAccessControlState.deliveryFromServiceInternal}  
                                            onChange={(event)=> handleToggleUserAccess("deliveryFromServiceInternal", event)}/>}/>
                                    
                                    {/* //? receive from store, or from a Push request */}
                                    <FormLabel id="rm-rcv-no-store" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>RM Recv - other than store</FormLabel>
                                        <FormControlLabel label="RM Rcv Other Than Production and QC" control={<Checkbox checked={userAccessControlState.rmRcvOtherThanProdAndQC}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvOtherThanProdAndQC", event)}/>}/>
                                        <FormControlLabel label="RM Rcv QC" control={<Checkbox checked={userAccessControlState.rmRcvQC}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvQC", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Thermoforming" control={<Checkbox checked={userAccessControlState.rmRcvThermoforming}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvThermoforming", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Door Foaming" control={<Checkbox checked={userAccessControlState.rmRcvDoorFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvDoorFoaming", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Power Press" control={<Checkbox checked={userAccessControlState.rmRcvPowerPress}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvPowerPress", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Roll Forming" control={<Checkbox checked={userAccessControlState.rmRcvRollForming}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvRollForming", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Eva Wrap" control={<Checkbox checked={userAccessControlState.rmRcvEvaWrap}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvEvaWrap", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Pre Assembly" control={<Checkbox checked={userAccessControlState.rmRcvPreAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvPreAssembly", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Body Foaming" control={<Checkbox checked={userAccessControlState.rmRcvBodyFoaming}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvBodyFoaming", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Post Assembly" control={<Checkbox checked={userAccessControlState.rmRcvPostAssembly}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvPostAssembly", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Finishing Line" control={<Checkbox checked={userAccessControlState.rmRcvFinishingLine}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvFinishingLine", event)}/>}/>
                                        <FormControlLabel label="RM Rcv U Shell" control={<Checkbox checked={userAccessControlState.rmRcvUShell}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvUShell", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Heaters" control={<Checkbox checked={userAccessControlState.rmRcvHeaters}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvHeaters", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Pad Print" control={<Checkbox checked={userAccessControlState.rmRcvPadPrint}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvPadPrint", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Hot Stamp" control={<Checkbox checked={userAccessControlState.rmRcvHotStamp}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvHotStamp", event)}/>}/>
                                        <FormControlLabel label="RM Rcv Clinching" control={<Checkbox checked={userAccessControlState.rmRcvClinching}  
                                            onChange={(event)=> handleToggleUserAccess("rmRcvClinching", event)}/>}/>
                                    
                                    {/* //? if any section/department (request to) send anything to any other section/department */}
                                    <FormLabel id="rm-rcv-no-store" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>RM/Part Push</FormLabel>
                                        <FormControlLabel label="RM Push" control={<Checkbox checked={userAccessControlState.rmPush}  
                                            onChange={(event)=> handleToggleUserAccess("rmPush", event)}/>}/>
                                    
                                    <FormLabel id="production-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Production Control</FormLabel>
                                        <Grid container >
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control1">FG Production Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="FG Prod Entry" control={<Checkbox checked={userAccessControlState.fgProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("fgProdEntry", event)}/>}/>
                                                <FormControlLabel label="FG Prod Edit" control={<Checkbox checked={userAccessControlState.fgProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("fgProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control2">Gas Charging Production Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="GC Prod Entry" control={<Checkbox checked={userAccessControlState.gasChargingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("gasChargingProdEntry", event)}/>}/>
                                                <FormControlLabel label="GC Prod Edit" control={<Checkbox checked={userAccessControlState.gasChargingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("gasChargingProdEdit", event)}/>}/>
                                            </Grid>
                                            
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control3">Door Fitting Control</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Post Door Fitting Entry" control={<Checkbox checked={userAccessControlState.postDoorFittingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("postDoorFittingProdEntry", event)}/>}/>
                                                <FormControlLabel label="Post Door Fitting Edit" control={<Checkbox checked={userAccessControlState.postDoorFittingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("postDoorFittingProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control4">Body Foaming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Body Foam Prod Entry" control={<Checkbox checked={userAccessControlState.bodyFoamingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("bodyFoamingProdEntry", event)}/>}/>
                                                <FormControlLabel label="Body Foam Prod Edit" control={<Checkbox checked={userAccessControlState.bodyFoamingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("bodyFoamingProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control5">Pre Assmb Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Pre Assmb Prod Entry" control={<Checkbox checked={userAccessControlState.preAssemblyProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("preAssemblyProdEntry", event)}/>}/>
                                                <FormControlLabel label="Pre Assmb Prod Edit" control={<Checkbox checked={userAccessControlState.preAssemblyProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("preAssemblyProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control6">Evaporator Wrapping</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Eva Wrap Entry" control={<Checkbox checked={userAccessControlState.evaWrapProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("evaWrapProdEntry", event)}/>}/>
                                                <FormControlLabel label="Eva Wrap Edit" control={<Checkbox checked={userAccessControlState.evaWrapProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("evaWrapProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control7">Thermoforming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Thermo Prod Entry" control={<Checkbox checked={userAccessControlState.thermoformingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("thermoformingProdEntry", event)}/>}/>
                                                <FormControlLabel label="Thermo Prod Edit" control={<Checkbox checked={userAccessControlState.thermoformingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("thermoformingProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control8">Door Foaming Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Door Prod Entry" control={<Checkbox checked={userAccessControlState.doorFoamingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("doorFoamingProdEntry", event)}/>}/>
                                                <FormControlLabel label="Door Prod Edit" control={<Checkbox checked={userAccessControlState.doorFoamingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("doorFoamingProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control9">Power Press Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Power Press Prod Entry" control={<Checkbox checked={userAccessControlState.powerPressProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("powerPressProdEntry", event)}/>}/>
                                                <FormControlLabel label="Power Press Prod Edit" control={<Checkbox checked={userAccessControlState.powerPressProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("powerPressProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control10">Side Sheet Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Side Sheet Prod Entry" control={<Checkbox checked={userAccessControlState.sideSheetProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("sideSheetProdEntry", event)}/>}/>
                                                <FormControlLabel label="Side Sheet Prod Edit" control={<Checkbox checked={userAccessControlState.sideSheetProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("sideSheetProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control11">U Shell Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="U Shell Prod Entry" control={<Checkbox checked={userAccessControlState.uShellProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("uShellProdEntry", event)}/>}/>
                                                <FormControlLabel label="U Shell Prod Edit" control={<Checkbox checked={userAccessControlState.uShellProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("uShellProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control12">Heater Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Heater Prod Entry" control={<Checkbox checked={userAccessControlState.heaterProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("heaterProdEntry", event)}/>}/>
                                                <FormControlLabel label="Heater Prod Edit" control={<Checkbox checked={userAccessControlState.heaterProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("heaterProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control13">Clinching Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Clinching Prod Entry" control={<Checkbox checked={userAccessControlState.clinchingProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("clinchingProdEntry", event)}/>}/>
                                                <FormControlLabel label="Clinching Prod Edit" control={<Checkbox checked={userAccessControlState.clinchingProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("clinchingProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control14">Pad Print Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Pad Print Prod Entry" control={<Checkbox checked={userAccessControlState.padPrintProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("padPrintProdEntry", event)}/>}/>
                                                <FormControlLabel label="Pad Print Prod Edit" control={<Checkbox checked={userAccessControlState.padPrintProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("padPrintProdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="production-control15">Hot Stamp Production</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="Hot Stamp Prod Entry" control={<Checkbox checked={userAccessControlState.hotStampProdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("hotStampProdEntry", event)}/>}/>
                                                <FormControlLabel label="Hot Stamp Prod Edit" control={<Checkbox checked={userAccessControlState.hotStampProdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("hotStampProdEdit", event)}/>}/>
                                            </Grid>
                                        </Grid>
                                    
                                    <FormLabel id="quality-control" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Quality Control</FormLabel>
                                        <Grid container>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control1">IQC</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="IQC Entry" control={<Checkbox checked={userAccessControlState.iqcEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("iqcEntry", event)}/>}/>
                                                <FormControlLabel label="IQC Edit" control={<Checkbox checked={userAccessControlState.iqcEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("iqcEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control2">OSD</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="OSD Entry" control={<Checkbox checked={userAccessControlState.osdEntry}  
                                                    onChange={(event)=> handleToggleUserAccess("osdEntry", event)}/>}/>
                                                <FormControlLabel label="OSD Edit" control={<Checkbox checked={userAccessControlState.osdEdit}  
                                                    onChange={(event)=> handleToggleUserAccess("osdEdit", event)}/>}/>
                                            </Grid>
                                            <Grid item xs={4} sx={{alignSelf: 'center'}}>
                                                <FormLabel id="quality-control3">SR Singer service</FormLabel>
                                            </Grid>
                                            <Grid item xs={8} sx={{alignSelf: 'center'}}>
                                                <FormControlLabel label="SR Singer Service" control={<Checkbox checked={userAccessControlState.SSCSR}  
                                                    onChange={(event)=> handleToggleUserAccess("SSCSR", event)}/>}/>
                                            </Grid>
                                            
                                        </Grid>
                                    <FormLabel id="disposal" sx={{ borderBottom: 1, borderColor: 'rebeccapurple' }}>Disposal</FormLabel>
                                        <FormControlLabel label="Disposal Request" control={<Checkbox checked={userAccessControlState.disposalRequest}  
                                            onChange={(event)=> handleToggleUserAccess("disposalRequest", event)}/>}/>
                                        <FormControlLabel label="Disposal Approval" control={<Checkbox checked={userAccessControlState.disposalApproval}  
                                            onChange={(event)=> handleToggleUserAccess("disposalApproval", event)}/>}/>
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
