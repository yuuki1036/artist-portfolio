import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WaveDivider } from "./index";

const meta: Meta<typeof WaveDivider> = {
  title: "Components/WaveDivider",
  component: WaveDivider,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WaveDivider>;

export const Gentle: Story = {
  render: () => (
    <div>
      <div
        style={{
          background: "rgb(var(--color-bg-primary))",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>
          Section A (primary)
        </span>
      </div>
      <WaveDivider />
      <div
        style={{
          background: "rgb(var(--color-bg-warm))",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>
          Section B (warm)
        </span>
      </div>
    </div>
  ),
};

export const Playful: Story = {
  render: () => (
    <div>
      <div
        style={{
          background: "rgb(var(--color-bg-primary))",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>
          Section A (primary)
        </span>
      </div>
      <WaveDivider variant="playful" />
      <div
        style={{
          background: "rgb(var(--color-bg-warm))",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>
          Section B (warm)
        </span>
      </div>
    </div>
  ),
};

export const AllTransitions: Story = {
  render: () => (
    <div>
      <div
        style={{
          background: "rgb(var(--color-bg-primary))",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>Primary</span>
      </div>
      <WaveDivider variant="playful" />
      <div
        style={{
          background: "rgb(var(--color-bg-warm))",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>Warm</span>
      </div>
      <WaveDivider
        topColor="rgb(var(--color-bg-warm))"
        bottomColor="rgb(var(--color-bg-deep))"
      />
      <div
        style={{
          background: "rgb(var(--color-bg-deep))",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-on-deep))" }}>Deep</span>
      </div>
      <WaveDivider
        topColor="rgb(var(--color-bg-deep))"
        bottomColor="rgb(var(--color-bg-primary))"
        flip
        variant="playful"
      />
      <div
        style={{
          background: "rgb(var(--color-bg-primary))",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "rgb(var(--color-text-primary))" }}>
          Primary again
        </span>
      </div>
    </div>
  ),
};
