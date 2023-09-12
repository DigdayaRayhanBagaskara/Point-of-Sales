/* eslint-disable no-unused-vars */
import React from "react";
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
import { NavLink } from "react-router-dom";
const SidebarSR = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <NavLink to="sales-summary" className="flex items-center">
              Sales Summary
            </NavLink>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <NavLink to="gross-profit" className="flex items-center">
              Gross Profit
            </NavLink>
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default SidebarSR;
