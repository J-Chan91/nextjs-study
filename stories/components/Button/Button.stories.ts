import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
    label: "Button",
  },
};

export const Default: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Button",
    variant: "fulfilled",
  },
};
