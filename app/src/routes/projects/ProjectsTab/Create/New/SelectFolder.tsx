import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { MinusCircledIcon } from '@radix-ui/react-icons';
import { StepProps } from '..';
import { MainChannels } from '/common/constants';

export const NewSelectFolder = ({
    props: { projectData, setProjectData, currentStep, totalSteps, prevStep, nextStep },
}: {
    props: StepProps;
}) => {
    async function pickProjectFolder() {
        const path = (await window.api.invoke(MainChannels.PICK_COMPONENTS_DIRECTORY)) as
            | string
            | null;

        if (path == null) {
            return;
        }
        setProjectData({
            ...projectData,
            folderPath: path,
        });
    }

    return (
        <Card className="w-[30rem]">
            <CardHeader>
                <CardTitle>{'Select your project folder'}</CardTitle>
                <CardDescription>{'This is where we’ll reference your App'}</CardDescription>
            </CardHeader>
            <CardContent className="h-24 flex items-center w-full">
                {projectData.folderPath ? (
                    <div className="w-full flex flex-row items-center border px-4 py-5 rounded bg-bg">
                        <div className="flex flex-col gap-1">
                            <p className="text-regular">{projectData.name}</p>
                            <p className="text-mini text-text">{projectData.folderPath}</p>
                        </div>
                        <Button
                            className="ml-auto"
                            variant={'ghost'}
                            size={'icon'}
                            onClick={() => {
                                setProjectData({
                                    ...projectData,
                                    folderPath: undefined,
                                });
                            }}
                        >
                            <MinusCircledIcon />
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="w-full h-20 text-regularPlus text-text bg-bg/50"
                        variant={'outline'}
                        onClick={pickProjectFolder}
                    >
                        {'Click to select your folder'}
                    </Button>
                )}
            </CardContent>
            <CardFooter className="text-sm">
                <p>{`${currentStep + 1} of ${totalSteps}`}</p>
                <div className="flex ml-auto gap-2">
                    <Button type="button" onClick={prevStep} variant="ghost">
                        Rename folder
                    </Button>
                    <Button
                        disabled={!projectData.folderPath}
                        type="button"
                        onClick={nextStep}
                        variant="outline"
                    >
                        {projectData.folderPath ? 'Set up project' : 'Next'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
