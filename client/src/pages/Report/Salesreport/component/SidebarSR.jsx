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
      <Card className="border border-gray-500 rounded w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
            <NavLink to="sales-summary" className="flex items-center">
              <ListItem>
                  Sales Summary
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px]" />
            <NavLink to="gross-profit" className="flex items-center">
              <ListItem>
                  Gross Profit
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px] " />
            <NavLink to="item-sales" className="flex items-center">
              <ListItem>
                  Item Sales
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px] " />
            <NavLink to="category-sales" className="flex items-center">
              <ListItem>
                  Category Sales
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px] " />
            <NavLink to="brand-sales" className="flex items-center">
              <ListItem>
                  Brand Sales
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px] " />
            <NavLink to="discount-sales" className="flex items-center">
              <ListItem>
                  Discount
              </ListItem>
            </NavLink>
          <hr className="bg-gray-500 pt-[1px] " />
        </List>
      </Card>
    </>
  );
};

export default SidebarSR;
