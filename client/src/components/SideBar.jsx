import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../pages/Auth/Logout";

const SideBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(0);
  const [showModalLogout, setShowModalLogout] = useState(false)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openModal = () => {
    setShowModalLogout(true)
  }
  const closeModal = () => {
    setShowModalLogout(false)
  }

  return (
    <>
      <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Point Of Sales
          </Typography>
        </div>
        <List>
          {/* Dashboard */}
          <NavLink to="dashboard" className="flex items-center">
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>

          <hr className="my-2 border-blue-gray-50" />

          {/* Data */}
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Data
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink to="employee" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Employee
                  </ListItem>
                </NavLink>
                <NavLink to="users" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Users
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Event */}
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Event
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink to="discount" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Discount
                  </ListItem>
                </NavLink>
                <NavLink to="promo" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Promo
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Product */}
          <Accordion
            open={open === 4}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Product
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink to="brand-produk" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={7} className="h-3 w-5" />
                    </ListItemPrefix>
                    Brand Product
                  </ListItem>
                </NavLink>
                <NavLink to="categories" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={7} className="h-3 w-5" />
                    </ListItemPrefix>
                    Category Product
                  </ListItem>
                </NavLink>
                <NavLink to="variant" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={7} className="h-3 w-5" />
                    </ListItemPrefix>
                    Product & Product Variant
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Report */}
          <Accordion
            open={open === 5}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 5}>
              <AccordionHeader
                onClick={() => handleOpen(5)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ClipboardIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Report
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink
                  to="log-management-report"
                  className="flex items-center"
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Log Management Report
                  </ListItem>
                </NavLink>
                <NavLink to="sales-report" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Sales Report
                  </ListItem>
                </NavLink>
                <NavLink
                  to="transaction-report"
                  className="flex items-center"
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Transaction Report
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Roles */}
          <NavLink to="roles" className="flex items-center">
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Roles
            </ListItem>
          </NavLink>

          {/* Transaction */}
          <Accordion
            open={open === 6}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 6 ? "rotate-180" : ""
                  }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 6}>
              <AccordionHeader
                onClick={() => handleOpen(6)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Transaction
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink to="sales-transaction" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Sales Transaction
                  </ListItem>
                </NavLink>
                <NavLink to="struk-transaction" className="flex items-center">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Struk Transaction
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Logout */}
          <NavLink onClick={openModal} className="flex items-center">
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </NavLink>
        </List>
      </Card>

      {
        showModalLogout &&
        <Logout close={closeModal}/>
      }
    </>
  );
};

export default SideBar;
