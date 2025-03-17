export abstract class Command {
    abstract getName(): string;
    abstract getDescription(): string;
    abstract getUsage(): string;
    abstract execute(args: string[]): Promise<void>;
  }