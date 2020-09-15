// import React from 'react'

// const Bol = () => {
//   return (
//   <div>
//     <form id="form" action="" method="post">
		
//     <div id="invHeader">
//       <div id="headLeft">
//         <h1>Bill of Lading</h1>
//         <div>
//           <p style="padding-bottom:8px;">Ship From: 
            
//               <select id="ship_from_select" style="width:70px;height:16px;margin:0;padding:0;position:absolute;">
//                 <option value="Choose">Choose</option>
                
//               </select>
//               <span id="saveShipFrom" style="margin-left: 78px;color:#2E86C1;font-weight:normal;cursor:pointer;"><i class="far fa-save"></i>&nbsp;Save</span>
            
//           </p>
//           <textarea id="shipper" name="ship_from"></textarea>
//           <div style="border:none;float:left;width:280px">
//             <span>SID#: </span><input type="text" id="sid" name="sid_no" value=""/>
//           </div>
//           <div style="border:none;float:left;">
//             <input type="checkbox" value="1" id="fobOne" name="from_fob"/><span> FOB</span>
//           </div>
//           <div style="border:none;padding:0;margin:0" class="clear"></div>
//         </div>
//         <div>
//           <div style="border:none;float:left;width:185px;padding:0;">
//             <p>Ship To: 
              
//                 <select id="ship_to_select" style="width:70px;height:16px;margin:0;padding:0;position:absolute;">
//                   <option value="Choose">Choose</option>
                  
//                 </select>
//                 <span id="saveShipTo" style="margin-left: 78px;color:#2E86C1;font-weight:normal;cursor:pointer;"><i class="far fa-save"></i>&nbsp;Save</span>
              
//             </p>
//           </div>
//           <div style="border:none;float:left;padding:0;margin-left:10px;">
//             <span>Location No:</span><input type="text" size="6" id="locNo" name="loc_no" value=""/>
//           </div>
//           <div style="border:none" class="clear"></div>
//           <textarea id="shipTo" name="ship_to"></textarea>
//           <div style="border:none;float:left;width:280px">
//             <span>CID#: </span><input type="text" id="cid" name="cid_no" value=""/>
//           </div>
//           <div style="border:none;float:left;">	
//             <input type="checkbox" value="1" id="fobTwo" name="to_fob"/><span> FOB</span>
//           </div>
//           <div style="border:none;padding:0;margin:0" class="clear"></div>
//         </div>
//         <div>
//           <p>3rd Pty Freight Charges - Bill To:
            
//               <select id="bill_to_select" style="width:70px;height:16px;margin:0;padding:0;position:absolute;">
//                 <option value="Choose">Choose</option>
                
//               </select>
//               <span id="saveBillTo" style="margin-left: 78px;color:#2E86C1;font-weight:normal;cursor:pointer;"><i class="far fa-save"></i>&nbsp;Save</span>
            
//           </p>
//           <textarea id="thirdPty" name="bill_to"></textarea>
//         </div>
//       </div>
//       <div id="headRight">
//         <div class="inlineSpan border">
//           <span>Date:</span>
//           <span class="fullWidth">&nbsp;<input type="text" id="date" name="date" value="2020-09-14"/></span>
//         </div>
//         <div class="inlineSpan border">
//           <span>Bill of Lading No:</span>
//           <span class="fullWidth">&nbsp;<input type="text" id="BOL" name="bol_no" value=""/></span>
//           <div class="barcode">
//             <span>BARCODE SPACE</span>
//           </div>
//         </div>
//         <div class="inlineSpan border">
//           <div>
//             <span>Carrier Name:</span>
//             <span class="fullWidth">&nbsp;<input type="text" id="carrier" list="carrier_list" name="carrier_name" value=""/>
              
//                 <datalist id="carrier_list">
                  
//                 </datalist>
              
//             </span>
//           </div>
//           <div>
//             <span>Trailer No:</span>
//             <span class="fullWidth">&nbsp;<input type="text" id="trailer" name="trailer_no" value=""/></span>
//           </div>
//           <div>
//             <span>Seal Number(s):</span>
//             <span class="fullWidth">&nbsp;<input type="text" id="seal" name="seal_no" value=""/></span>
//           </div>
//         </div>
//         <div class="inlineSpan border">
//           <div>
//             <span>SCAC:</span>
//             <span class="fullWidth">&nbsp;<input type="text" id="SCAC" name="scac" value=""/></span>
//           </div>
//           <div>
//             <span>Pro No:</span>
//             <span class="fullWidth">&nbsp;<input type="text" id="ProNo" name="pro_no" value=""/></span>
//           </div>
//           <div class="barcode">
//             <span>BARCODE SPACE</span>
//           </div>
//         </div>
//         <div class="border">
//           <p style="padding-bottom:8px;font-size:12px;">Freight Charge Terms (prepaid unless marked otherwise)</p>
//           <input type="checkbox" value="1" id="pre" name="terms_prepaid"/><span> Prepaid</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="1" id="col" name="terms_collect"/><span> Collect</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="1" id="third" name="terms_third"/><span> 3rd Party</span>
//         </div>
//         <div class="border">
//           <input type="checkbox" value="1" id="masterBOL" name="master_bol"/><span> Master BOL: w/attached underlying BOLs</span>
//         </div>
//       </div>
//       <div class="clear"></div>
//       <div id="inst">
//         <p>Special Instructions:</p>
//         <textarea id="notes" name="inst"></textarea>
//       </div>
//     </div>
//     <div id="invTable" style="position:relative;">
//       <i id="clearCust" style="padding:1px;border:1px solid red;width:35px;font-size:10px;position:absolute;top:22px;left:722px;cursor:pointer;color:red;">clear all</i><i data-line="1" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:38px;left:722px;cursor:pointer;color:red;"></i><i data-line="2" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:51px;left:722px;cursor:pointer;color:red;"></i><i data-line="3" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:64px;left:722px;cursor:pointer;color:red;"></i><i data-line="4" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:77px;left:722px;cursor:pointer;color:red;"></i><i data-line="5" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:90px;left:722px;cursor:pointer;color:red;"></i><i data-line="6" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:103px;left:722px;cursor:pointer;color:red;"></i><i data-line="7" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:116px;left:722px;cursor:pointer;color:red;"></i><i data-line="8" class="far fa-minus-square clearCustLine" style="font-size:12px;position:absolute;top:129px;left:722px;cursor:pointer;color:red;"></i><table id="items">
//         <thead>
//           <tr>
//             <th class="tableBanner" colspan="5">Customer Order Information</th>
//           </tr>
//           <tr>
//             <th>Customer Order No.</th>
//             <th># Pkgs.</th>
//             <th>Weight<br/>U.<input style="width:20px;" type="text" id="weight_1_unit" name="weight_1_unit" maxlength="4" value=""/></th>
//             <th>Pallet/Slip  (Y/N)</th>
//             <th>Additional Shipper Info</th>
//           </tr>
//         </thead>
//         <tbody>
          
//           <tr>
//             <td style="width:135px;"><input type="text" id="ordNo_1" name="cust_info_1_A" value=""/></td>
//             <td style="width:45px;"><input type="text" class="pkgs" id="pkgs_1" name="cust_info_1_B" value=""/></td>
//             <td style="width:45px;"><input type="text" class="wght" id="wght_1" name="cust_info_1_C" value=""/></td>
//             <td style="width:55px;"><input type="text" id="pallet_1" name="cust_info_1_D" value=""/></td>
//             <td><input type="text" id="shipInfo_1" name="cust_info_1_E" value=""/></td>
//           </tr>
          
//           <tr>
//             <td><input type="text" id="ordNo_2" name="cust_info_2_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_2" name="cust_info_2_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_2" name="cust_info_2_C" value=""/></td>
//             <td><input type="text" id="pallet_2" name="cust_info_2_D" value=""/></td>
//             <td><input type="text" id="shipInfo_2" name="cust_info_2_E" value=""/></td>
//           </tr>
          
          
//           <tr>
//             <td><input type="text" id="ordNo_3" name="cust_info_3_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_3" name="cust_info_3_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_3" name="cust_info_3_C" value=""/></td>
//             <td><input type="text" id="pallet_3" name="cust_info_3_D" value=""/></td>
//             <td><input type="text" id="shipInfo_3" name="cust_info_3_E" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" id="ordNo_4" name="cust_info_4_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_4" name="cust_info_4_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_4" name="cust_info_4_C" value=""/></td>
//             <td><input type="text" id="pallet_4" name="cust_info_4_D" value=""/></td>
//             <td><input type="text" id="shipInfo_4" name="cust_info_4_E" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" id="ordNo_5" name="cust_info_5_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_5" name="cust_info_5_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_5" name="cust_info_5_C" value=""/></td>
//             <td><input type="text" id="pallet_5" name="cust_info_5_D" value=""/></td>
//             <td><input type="text" id="shipInfo_5" name="cust_info_5_E" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" id="ordNo_6" name="cust_info_6_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_6" name="cust_info_6_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_6" name="cust_info_6_C" value=""/></td>
//             <td><input type="text" id="pallet_6" name="cust_info_6_D" value=""/></td>
//             <td><input type="text" id="shipInfo_6" name="cust_info_6_E" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" id="ordNo_7" name="cust_info_7_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_7" name="cust_info_7_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_7" name="cust_info_7_C" value=""/></td>
//             <td><input type="text" id="pallet_7" name="cust_info_7_D" value=""/></td>
//             <td><input type="text" id="shipInfo_7" name="cust_info_7_E" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" id="ordNo_8" name="cust_info_8_A" value=""/></td>
//             <td><input type="text" class="pkgs" id="pkgs_8" name="cust_info_8_B" value=""/></td>
//             <td><input type="text" class="wght" id="wght_8" name="cust_info_8_C" value=""/></td>
//             <td><input type="text" id="pallet_8" name="cust_info_8_D" value=""/></td>
//             <td><input type="text" id="shipInfo_8" name="cust_info_8_E" value=""/></td>
//           </tr>
          
//         </tbody>
//         <tfoot>
//           <tr class="totals">
//             <td>Totals</td>
//             <td><div id="total-pkgs"></div></td>
//             <td><div id="total-wght"></div></td>
//             <td class="blocked" colspan="2"> </td>
  
//           </tr>
//         </tfoot>
//       </table>
//       <a href="#product_modal" rel="modal:open"><i class="far fa-plus-square" data-toggle="modal" data-target="#productModal" id="productModal" style="position:absolute;top:191px;left:-16px;cursor:pointer;"></i></a><i id="clearCarrier" style="padding:1px;border:1px solid red;width:35px;font-size:10px;position:absolute;top:191px;left:722px;cursor:pointer;color:red;">clear all</i><i data-line="1" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:207px;left:722px;cursor:pointer;color:red;"></i><i data-line="2" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:220px;left:722px;cursor:pointer;color:red;"></i><i data-line="3" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:233px;left:722px;cursor:pointer;color:red;"></i><i data-line="4" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:246px;left:722px;cursor:pointer;color:red;"></i><i data-line="5" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:259px;left:722px;cursor:pointer;color:red;"></i><i data-line="6" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:272px;left:722px;cursor:pointer;color:red;"></i><i data-line="7" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:285px;left:722px;cursor:pointer;color:red;"></i><i data-line="8" class="far fa-minus-square clearCarrierLine" style="font-size:12px;position:absolute;top:298px;left:722px;cursor:pointer;color:red;"></i><table id="carrier">
//         <thead>
//           <tr>
//             <th class="tableBanner" colspan="9">Carrier Information</th>
//           </tr>
//           <tr>
//             <th colspan="2">Handling Unit</th>
//             <th colspan="2">Package</th>
//             <td class="blank" colspan="2"> </td>
//             <th>Commodity Description</th>
//             <th colspan="2">LTL Only</th>
//           </tr>
//           <tr>
//             <th>QTY</th>
//             <th>TYPE</th>
//             <th>QTY</th>
//             <th>TYPE</th>
//             <th>Weight<br/>U.<input style="width:20px;" type="text" id="weight_2_unit" name="weight_2_unit" maxlength="4" value=""/></th>
//             <th>H.M. (X)</th>
//             <th style="font-size:8px;font-weight:normal;">Commodities requiring special or additional care or attention in handling or stowing must be so marked and packaged as to ensure safe transportation with ordinary care. <p><strong>See Section 2(e) of MNMFC Item 360</strong></p></th>
//             <th>NMFC No.</th>
//             <th>Class</th>
//           </tr>
//         </thead>
        
//         <tbody>
          
          
//           <tr>
//             <td style="width:45px;"><input type="text" class="qtyA" id="qtyA_1" name="carrier_info_1_A" value=""/></td>
//             <td style="width:45px;"><input type="text" id="typeA_1" name="carrier_info_1_B" value=""/></td>
//             <td style="width:45px;"><input type="text" class="qtyB" id="qtyB_1" name="carrier_info_1_C" value=""/></td>
//             <td style="width:45px;"><input type="text" id="typeB_1" name="carrier_info_1_D" value=""/></td>
//             <td style="width:45px;"><input type="text" class="carWght" id="carWght_1" name="carrier_info_1_E" value=""/></td>
//             <td style="width:45px;"><input type="text" id="hm_1" name="carrier_info_1_F" value=""/></td>
//             <td><input type="text" id="desc_1" name="carrier_info_1_G" value=""/></td>
//             <td style="width:45px;"><input type="text" id="nmfc_1" name="carrier_info_1_H" value=""/></td>
//             <td style="width:45px;"><input type="text" id="class_1" name="carrier_info_1_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_2" name="carrier_info_2_A" value=""/></td>
//             <td><input type="text" id="typeA_2" name="carrier_info_2_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_2" name="carrier_info_2_C" value=""/></td>
//             <td><input type="text" id="typeB_2" name="carrier_info_2_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_2" name="carrier_info_2_E" value=""/></td>
//             <td><input type="text" id="hm_2" name="carrier_info_2_F" value=""/></td>
//             <td><input type="text" id="desc_2" name="carrier_info_2_G" value=""/></td>
//             <td><input type="text" id="nmfc_2" name="carrier_info_2_H" value=""/></td>
//             <td><input type="text" id="class_2" name="carrier_info_2_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_3" name="carrier_info_3_A" value=""/></td>
//             <td><input type="text" id="typeA_3" name="carrier_info_3_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_3" name="carrier_info_3_C" value=""/></td>
//             <td><input type="text" id="typeB_3" name="carrier_info_3_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_3" name="carrier_info_3_E" value=""/></td>
//             <td><input type="text" id="hm_3" name="carrier_info_3_F" value=""/></td>
//             <td><input type="text" id="desc_3" name="carrier_info_3_G" value=""/></td>
//             <td><input type="text" id="nmfc_3" name="carrier_info_3_H" value=""/></td>
//             <td><input type="text" id="class_3" name="carrier_info_3_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_4" name="carrier_info_4_A" value=""/></td>
//             <td><input type="text" id="typeA_4" name="carrier_info_4_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_4" name="carrier_info_4_C" value=""/></td>
//             <td><input type="text" id="typeB_4" name="carrier_info_4_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_4" name="carrier_info_4_E" value=""/></td>
//             <td><input type="text" id="hm_4" name="carrier_info_4_F" value=""/></td>
//             <td><input type="text" id="desc_4" name="carrier_info_4_G" value=""/></td>
//             <td><input type="text" id="nmfc_4" name="carrier_info_4_H" value=""/></td>
//             <td><input type="text" id="class_4" name="carrier_info_4_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_5" name="carrier_info_5_A" value=""/></td>
//             <td><input type="text" id="typeA_5" name="carrier_info_5_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_5" name="carrier_info_5_C" value=""/></td>
//             <td><input type="text" id="typeB_5" name="carrier_info_5_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_5" name="carrier_info_5_E" value=""/></td>
//             <td><input type="text" id="hm_5" name="carrier_info_5_F" value=""/></td>
//             <td><input type="text" id="desc_5" name="carrier_info_5_G" value=""/></td>
//             <td><input type="text" id="nmfc_5" name="carrier_info_5_H" value=""/></td>
//             <td><input type="text" id="class_5" name="carrier_info_5_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_6" name="carrier_info_6_A" value=""/></td>
//             <td><input type="text" id="typeA_6" name="carrier_info_6_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_6" name="carrier_info_6_C" value=""/></td>
//             <td><input type="text" id="typeB_6" name="carrier_info_6_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_6" name="carrier_info_6_E" value=""/></td>
//             <td><input type="text" id="hm_6" name="carrier_info_6_F" value=""/></td>
//             <td><input type="text" id="desc_6" name="carrier_info_6_G" value=""/></td>
//             <td><input type="text" id="nmfc_6" name="carrier_info_6_H" value=""/></td>
//             <td><input type="text" id="class_6" name="carrier_info_6_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_7" name="carrier_info_7_A" value=""/></td>
//             <td><input type="text" id="typeA_7" name="carrier_info_7_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_7" name="carrier_info_7_C" value=""/></td>
//             <td><input type="text" id="typeB_7" name="carrier_info_7_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_7" name="carrier_info_7_E" value=""/></td>
//             <td><input type="text" id="hm_7" name="carrier_info_7_F" value=""/></td>
//             <td><input type="text" id="desc_7" name="carrier_info_7_G" value=""/></td>
//             <td><input type="text" id="nmfc_7" name="carrier_info_7_H" value=""/></td>
//             <td><input type="text" id="class_7" name="carrier_info_7_I" value=""/></td>
//           </tr>
          
//           <tr> 
//             <td><input type="text" class="qtyA" id="qtyA_8" name="carrier_info_8_A" value=""/></td>
//             <td><input type="text" id="typeA_8" name="carrier_info_8_B" value=""/></td>
//             <td><input type="text" class="qtyB" id="qtyB_8" name="carrier_info_8_C" value=""/></td>
//             <td><input type="text" id="typeB_8" name="carrier_info_8_D" value=""/></td>
//             <td><input type="text" class="carWght" id="carWght_8" name="carrier_info_8_E" value=""/></td>
//             <td><input type="text" id="hm_8" name="carrier_info_8_F" value=""/></td>
//             <td><input type="text" id="desc_8" name="carrier_info_8_G" value=""/></td>
//             <td><input type="text" id="nmfc_8" name="carrier_info_8_H" value=""/></td>
//             <td><input type="text" id="class_8" name="carrier_info_8_I" value=""/></td>
//           </tr>
          
//         </tbody>
        
//         <tfoot>
//           <tr class="totals">
//             <td><div id="handling-qty"></div></td>
//             <td class="blocked"> </td>
//             <td><div id="package-qty"></div></td>
//             <td class="blocked"> </td>
//             <td><div id="carrier-weight"></div></td>
//             <td class="blocked"> </td>
//             <td>Totals</td>
//             <td class="blocked"> </td>
//             <td class="blocked"> </td>
            
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//     <div id="ftrBox">
//       <div class="ftr left two-col" style="height:65px">
//         <p style="margin-bottom: 6px;">Where the rate is dependent on value, shippers are required to state specifically in writing the agreed or declared value of the property as follows:</p>
//         <p style="margin-bottom: 6px;">"The agreed or declared value of the property is specifically stated by the shipper to be not exceeding</p>
//         <input type="text" id="valueOne" name="fob_value" value=""/><span>FOB</span><input type="text" id="valueTwo" name="fob_loc" value=""/>."
//       </div>
//       <div class="ftr left two-col" style="height:65px;font-size:1em;">
//         <p style="padding:6px 0;"><strong>COD Amt. $</strong><input type="text" id="COD" name="cod_amt" value=""/></p>
//         <p><strong>Fee Terms:</strong><span><input type="checkbox" value="1" id="collect" name="fee_terms_collect"/>Collect</span><input type="checkbox" value="1" id="prepaid" name="fee_terms_prepaid"/><span>Prepaid</span></p>
//         <p><input type="checkbox" value="1" id="checkOK" name="fee_terms_check"/><span>Customer Check Acceptable</span></p>
//       </div>
//       <div class="clear"></div>
//       <div class="ftr" style="height:10px">
//         <p><strong>NOTE: Liability Limitation for loss or damage in this shipment may be applicable. See 49 U.S.C. - 14706(c)(1)(A) and (B).</strong></p>
//       </div>
//       <div class="ftr left two-col" style="height:45px">
//         <p>RECEIVED, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable, otherwise to the rates, classifications and rules that have been established by the carrier and are available to the shipper, on request, and to all applicable state and federal regulations.</p>
//       </div>
//       <div class="ftr left two-col" style="position:relative;height:45px;line-height:9px;">
//          <p>The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.</p>
//          <div class="left" style="margin-top:16px;">Shipper Signature</div>
         
//          <div class="sig" style="position:absolute;top:16px;left:90px;">
//            <i id="addSig1" class="far fa-plus-square" style="position:absolute;top:15px;left:-5px;cursor:pointer;"></i>
//            <i id="subSig1" class="far fa-minus-square" style="position:absolute;display:none;top:15px;left:-5px;cursor:pointer;color:red;"></i>
//            <input id="sig1" name="sig1" type="hidden" value=""/>
//         </div>
         
//          <div class="left" style="width:200px;height:24px;border-bottom:1px solid black"></div>
//          <div class="clear"></div>
//       </div>
//       <div class="clear"></div>
//       <div class="ftr left" style="position:relative;height:85px;width:220px;font-size:10px;line-height:9px;">
//         <p>This is to certify that the above named materials are properly classified, packaged, marked and labeled, and are in proper condition for transportation according to the applicable regulations of the DOT.</p>
        
//         <div class="sig" style="position:absolute;top:46px;left:9px;">
//           <i id="addSig2" class="far fa-plus-square" style="position:absolute;top:15px;left:-5px;cursor:pointer;"></i>
//            <i id="subSig2" class="far fa-minus-square" style="position:absolute;display:none;top:15px;left:-5px;cursor:pointer;color:red;"></i>
//            <input id="sig2" name="sig2" type="hidden" value=""/>
//         </div>
        
//         <div class="left" style="width:150px;margin-right:10px;">
//           <div style="width:140px;height:36px;border-bottom:1px solid black"></div>
//           <p>Shipper Signature</p>
//         </div>
//         <div class="left">
//           <div class="sigDate" style="width:60px;height:36px;border-bottom:1px solid black"><input type="text" id="sigDate" name="sigDate" value=""/></div>
//           <p>Date</p>
//         </div>
      
//       </div>
//       <div class="ftr left" style="height:85px;width:232px">
//         <div class="left" style="width:80px;">
//           <p><strong>Trailer Loaded</strong></p>
//           <p><input type="checkbox" value="1" id="loadedByShip" name="trailer_loaded_shipper"/>By Shipper</p>
//           <p><input type="checkbox" value="1" id="loadedByDrive" name="trailer_loaded_driver"/>By Driver</p>
//         </div>
//         <div class="left">
//           <p><strong>Freight Counted</strong></p>
//           <p><input type="checkbox" value="1" id="countedByShip" name="freight_counted_shipper"/>By Shipper</p>
//           <p><input type="checkbox" value="1" id="countedByDriveOne" name="freight_counted_driver_pallets"/>By Driver/pallets said to contain</p>
//           <p><input type="checkbox" value="1" id="countedByDriveTwo" name="freight_counted_driver_pieces"/>By Driver/Pieces</p>
//         </div>
//         <div class="clear"></div>
//       </div>
//       <div class="ftr left" style="position:relative;height:85px;width:240px;font-size:9.5px;">
//         <p>Carrier acknowledges receipt of packages and required placards. Carrier certifies emergency response information was made available and/or carrier has the DOT emergency response guidebook or equivalent documentation in the vehicle. Property described above is received in good order, except as noted.</p>
        
//         <div class="sig" style="position:absolute;top:48px;left:4px;">
//           <i id="addSig3" class="far fa-plus-square" style="position:absolute;top:15px;cursor:pointer;"></i>
//            <i id="subSig3" class="far fa-minus-square" style="position:absolute;display:none;top:15px;cursor:pointer;color:red;"></i>
//            <input id="sig3" name="sig3" type="hidden" value=""/>
//         </div>
        
//         <div class="left" style="width:150px;margin-right:10px;">
//           <div style="width:140px;height:34px;border-bottom:1px solid black"></div>
//           <p>Carrier Signature</p>
//         </div>
//         <div class="left">
//           <div class="sigDate" style="width:70px;height:34px;border-bottom:1px solid black"><input type="text" id="pickupDate" name="pickupDate" value=""/></div>
//           <p>Pickup Date</p>
//         </div>
//       </div>
//     </div>
//     <input type="hidden" name="logo_name" id="logo_name" value=""/>
//     <input type="hidden" name="logo_w" id="logo_w" value=""/>
//     <input type="hidden" name="logo_h" id="logo_h" value=""/>
//     <input type="hidden" name="logo_top" id="logo_top" value=""/>
//     <input type="hidden" name="logo_left" id="logo_left" value=""/>
//   </form>
//   </div>
//   )
// }

// export default Bol